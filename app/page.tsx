"use client";
import Link from "next/link";
import GenerationStep from "@/components/home/generationStep";
import Navbar from "@/components/Header";
import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function Hero() {
  const supabase = createClient();

  const { push } = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        push("/protected");
      }
    });
  }, []);
  return (
    <>
      <Navbar />
      <div className="hero py-12 bg-gradient-to-t from-blue-500 to-purple-700">
        <div className="hero-content md:px-0 px-4 max-w-6xl flex-col lg:flex-row-reverse">
          <img
            src="https://plus.unsplash.com/premium_photo-1681319553238-9860299dfb0f?auto=format&fit=crop&q=80&w=2831&ixlib=rb-4.0.3"
            className="max-w-sm  h-80 object-cover rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl text-slate-100 font-bold md:leading-none leading-tight md:mt-0 mt-10">
              Cubid Micro App Template
            </h1>
            <p className="py-2 text-xl text-slate-100 mt-4 pr-12">
              Mciro App to speed up your dev processes when building cubid based
              apps
            </p>
          </div>
        </div>
      </div>
      <GenerationStep />
    </>
  );
}

export default Hero;
