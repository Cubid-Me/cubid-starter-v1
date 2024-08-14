import React from 'react';
import TextField from '@/components/welcome/TextField';
import CheckBoxGroup from '@/components/welcome/CheckBoxGroup';
import RadioGroup from '@/components/welcome/RadioGroup';
import Button from '@/components/welcome/Button';
import { useTheme } from '@/context/ThemeContext';

interface DonationPreferencesStepProps {
    preferredDonationAmount: string;
    selectedCauses: string[];
    recurringDonation: string;
    setPreferredDonationAmount: (value: string) => void;
    setSelectedCauses: (value: string[]) => void;
    setRecurringDonation: (value: string) => void;
    handleCheckboxChange: (value: string) => void;
    nextStep: () => void;
}

const DonationPreferencesStep: React.FC<DonationPreferencesStepProps> = ({
    preferredDonationAmount, selectedCauses, recurringDonation, setPreferredDonationAmount,
    setSelectedCauses, setRecurringDonation, handleCheckboxChange, nextStep
}) => {
    const { theme } = useTheme();

    return (
        <div className={`donation-preferences-step ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            <h2 className="text-2xl font-bold">Customize Your Donations</h2>
            <TextField
                label="Preferred Donation Amount"
                name="preferredDonationAmount"
                value={preferredDonationAmount}
                onChange={(e) => setPreferredDonationAmount(e.target.value)}
            />
            <CheckBoxGroup
                label="Causes of Interest"
                name="causes"
                options={['Homelessness', 'Hunger', 'Education'].map(cause => ({ label: cause, value: cause }))}
                selectedValues={selectedCauses}
                onChange={handleCheckboxChange}
            />
            <RadioGroup
                label="Recurring Donations"
                name="recurringDonation"
                options={[
                    { label: 'Yes', value: 'yes' },
                    { label: 'No', value: 'no' }
                ]}
                selectedValue={recurringDonation}
                onChange={setRecurringDonation}
            />
            <Button label="Save Preferences" onClick={nextStep} />
        </div>
    );
};

export default DonationPreferencesStep;