
"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE, CONTACT_PHONE, CONTACT_EMAIL } from '@/constants';

interface SettingsData {
    whatsappNumber: string;
    whatsappMessage: string;
    contactPhone: string;
    contactEmail: string;
}

const defaultSettings: SettingsData = {
    whatsappNumber: WHATSAPP_NUMBER,
    whatsappMessage: WHATSAPP_MESSAGE,
    contactPhone: CONTACT_PHONE,
    contactEmail: CONTACT_EMAIL,
};

const SettingsContext = createContext<SettingsData>(defaultSettings);

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
    const [settings, setSettings] = useState<SettingsData>(defaultSettings);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch('/api/public/settings');
                if (res.ok) {
                    const data = await res.json();
                    setSettings({
                        whatsappNumber: data.whatsappNumber || defaultSettings.whatsappNumber,
                        whatsappMessage: data.whatsappMessage || defaultSettings.whatsappMessage,
                        contactPhone: data.contactPhone || defaultSettings.contactPhone,
                        contactEmail: data.contactEmail || defaultSettings.contactEmail,
                    });
                }
            } catch (error) {
                console.error('Failed to fetch settings:', error);
            }
        };

        fetchSettings();
    }, []);

    return (
        <SettingsContext.Provider value={settings}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => useContext(SettingsContext);
