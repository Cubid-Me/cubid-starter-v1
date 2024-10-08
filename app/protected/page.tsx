"use client";
import { createClient } from "@/utils/supabase/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedPage() {
  const { push } = useRouter();
  const supabase = createClient();
  const [uid, setUid] = useState(0);
  const [userCreated, setUserCreated] = useState(false);
  const [email, setEmail] = useState("");
  const [colorMode, setColorMode] = useState("light");
  const [apiData, setApiData] = useState({
    score: "",
    identity: "",
    score_details: "",
  });

  const fetchDataSchema = {
    get_score: async () => {
      const { data } = await axios.post(
        "https://passport.cubid.me/api/dapp/fetch_score",
        {
          apikey: process.env.NEXT_PUBLIC_CUBID_API_KEY,
          uid: uid,
        }
      );
      setApiData((d) => ({ ...d, score: data }));
    },
    get_identity: async () => {
      const { data } = await axios.post(
        "https://passport.cubid.me/api/dapp/get_identity",
        {
          apikey: process.env.NEXT_PUBLIC_CUBID_API_KEY,
          uid: uid,
        }
      );
      setApiData((d) => ({ ...d, identity: data }));
    },
    get_score_details: async () => {
      const { data } = await axios.post(
        "https://passport.cubid.me/api/dapp/get_score_details",
        {
          apikey: process.env.NEXT_PUBLIC_CUBID_API_KEY,
          uid: uid,
        }
      );
      setApiData((d) => ({ ...d, score_details: data }));
    },
  };

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      console.log(session?.user?.email);
      if (!session?.user?.email) {
        return push("/");
      } else {
        setEmail(session?.user?.email ?? "");
      }
    });
  }, [supabase]);

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">
        <div className="py-6 font-bold bg-purple-950 text-center">
          This is a protected page that you can only see as an authenticated
          user
        </div>
      </div>

      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <main className="flex-1 flex flex-col gap-6">
          <h2 className="font-bold text-4xl mb-4">Cubid Integration</h2>
          <p>{email}</p>
          <button
            onClick={async (e) => {
              e.preventDefault();
              const { data } = await axios.post(
                "https://passport.cubid.me/api/dapp/create_user",
                {
                  dapp_id: process.env.NEXT_PUBLIC_CUBID_API_KEY,
                  email,
                  stamptype: "email",
                }
              );
              const { uuid, newuser } = data;
              setUserCreated(newuser);
              setUid(uuid);
            }}
            type="submit"
            className="btn btn-accent w-full"
          >
            Get Uuid
          </button>
          <button
            onClick={async (e) => {
              e.preventDefault();
              await supabase.auth.signOut();
              window.location.href = window.location.origin;
            }}
            type="submit"
            className="btn btn-accent w-full"
          >
            Sign Out
          </button>
          <p>Uuid created for user - {uid}</p>
          <p>New User Created - {userCreated ? "TRUE" : "FALSE"}</p>
          {Boolean(uid) && (
            <>
              <a
                href={`https://passport.cubid.me/allow?uid=${uid}&colormode=${colorMode}`}
                onClick={() => {
                  localStorage.setItem("uid-to-fetch", uid as any);
                }}
                className="link link-accent"
              >
                Redirect to uuid
              </a>
              <p>
                Argument Sent to API's{" "}
                {JSON.stringify({
                  apikey: "8c354e51-d323-482a-86ca-e931cd0e91d8",
                  uid: uid,
                })}
              </p>
              <div className="space-y-2">
                <div className="grid grid-cols-5">
                  <div>/fetch_score</div>
                  <div className="mx-2">
                    <button
                      className="bg-blue-500 text-xs w-full py-2 rounded-md"
                      onClick={fetchDataSchema.get_score}
                    >
                      Fetch Score
                    </button>
                  </div>
                  <div className="col-span-3">
                    {Boolean(apiData.score) && JSON.stringify(apiData.score)}
                  </div>
                </div>
                <div className="grid grid-cols-5">
                  <div>/get_identity</div>
                  <div className="mx-2">
                    <button
                      className="bg-blue-500 text-xs w-full py-2 rounded-md"
                      onClick={fetchDataSchema.get_identity}
                    >
                      Get Identity
                    </button>
                  </div>
                  <div className="col-span-3">
                    {Boolean(apiData.identity) &&
                      JSON.stringify(apiData.identity)}
                  </div>
                </div>
                <div className="grid grid-cols-5">
                  <div>/get_score_details</div>
                  <div className="mx-2">
                    <button
                      className="bg-blue-500 text-xs w-full py-2 rounded-md"
                      onClick={fetchDataSchema.get_score_details}
                    >
                      Get Score Details
                    </button>
                  </div>
                  <div className="col-span-3">
                    {Boolean(apiData.score_details) &&
                      JSON.stringify(apiData.score_details)}
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{" "}
          <a
            href="https://passport.cubid.me/"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Cubid
          </a>
        </p>
      </footer>
    </div>
  );
}
