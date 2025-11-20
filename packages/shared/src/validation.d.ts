import { z } from 'zod';
export declare const CampaignInputSchema: z.ZodObject<{
    campaignObjective: z.ZodEnum<["lead-gen", "sales", "signup"]>;
    primaryConversionKPI: z.ZodString;
    targetAudience: z.ZodString;
    buyerPersonaKeywords: z.ZodArray<z.ZodString, "many">;
    productServiceName: z.ZodString;
    primaryOffer: z.ZodString;
    uniqueValueProposition: z.ZodString;
    top3To5Benefits: z.ZodArray<z.ZodString, "many">;
    featureList: z.ZodArray<z.ZodString, "many">;
    emotionalTriggers: z.ZodArray<z.ZodString, "many">;
    objectionsToOvercome: z.ZodArray<z.ZodString, "many">;
    testimonials: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        role: z.ZodString;
        company: z.ZodString;
        quote: z.ZodString;
        image: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        role: string;
        company: string;
        quote: string;
        image?: string | undefined;
    }, {
        name: string;
        role: string;
        company: string;
        quote: string;
        image?: string | undefined;
    }>, "many">;
    trustIndicators: z.ZodArray<z.ZodObject<{
        type: z.ZodEnum<["badge", "certification", "award", "statistic"]>;
        label: z.ZodString;
        value: z.ZodOptional<z.ZodString>;
        image: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: "badge" | "certification" | "award" | "statistic";
        label: string;
        value?: string | undefined;
        image?: string | undefined;
    }, {
        type: "badge" | "certification" | "award" | "statistic";
        label: string;
        value?: string | undefined;
        image?: string | undefined;
    }>, "many">;
    primaryCTAText: z.ZodString;
    secondaryCTAText: z.ZodOptional<z.ZodString>;
    formFields: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        label: z.ZodString;
        type: z.ZodEnum<["text", "email", "phone", "select", "textarea", "checkbox"]>;
        required: z.ZodBoolean;
        placeholder: z.ZodOptional<z.ZodString>;
        options: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        validation: z.ZodOptional<z.ZodObject<{
            pattern: z.ZodOptional<z.ZodString>;
            minLength: z.ZodOptional<z.ZodNumber>;
            maxLength: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            pattern?: string | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
        }, {
            pattern?: string | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        type: "text" | "email" | "phone" | "select" | "textarea" | "checkbox";
        name: string;
        label: string;
        required: boolean;
        options?: string[] | undefined;
        validation?: {
            pattern?: string | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
        } | undefined;
        placeholder?: string | undefined;
    }, {
        type: "text" | "email" | "phone" | "select" | "textarea" | "checkbox";
        name: string;
        label: string;
        required: boolean;
        options?: string[] | undefined;
        validation?: {
            pattern?: string | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
        } | undefined;
        placeholder?: string | undefined;
    }>, "many">;
    apiConfig: z.ZodOptional<z.ZodObject<{
        endpoint: z.ZodString;
        method: z.ZodEnum<["POST", "PUT"]>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        endpoint: string;
        method: "POST" | "PUT";
        headers?: Record<string, string> | undefined;
    }, {
        endpoint: string;
        method: "POST" | "PUT";
        headers?: Record<string, string> | undefined;
    }>>;
    heroImage: z.ZodOptional<z.ZodString>;
    secondaryImages: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    videoURL: z.ZodOptional<z.ZodString>;
    toneOfVoice: z.ZodEnum<["formal", "friendly", "playful"]>;
    brandColorPalette: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    fontStyleGuide: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    logo: z.ZodOptional<z.ZodString>;
    pageLayoutPreference: z.ZodEnum<["scroll", "modular", "storytelling"]>;
    targetSEOKeywords: z.ZodArray<z.ZodString, "many">;
    eventTrackingSetup: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    analyticsIDs: z.ZodOptional<z.ZodObject<{
        googleAnalytics: z.ZodOptional<z.ZodString>;
        googleTagManager: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        googleAnalytics?: string | undefined;
        googleTagManager?: string | undefined;
    }, {
        googleAnalytics?: string | undefined;
        googleTagManager?: string | undefined;
    }>>;
    privacyPolicyURL: z.ZodString;
    gdprCCPAConsentText: z.ZodString;
}, "strip", z.ZodTypeAny, {
    campaignObjective: "lead-gen" | "sales" | "signup";
    primaryConversionKPI: string;
    targetAudience: string;
    buyerPersonaKeywords: string[];
    productServiceName: string;
    primaryOffer: string;
    uniqueValueProposition: string;
    top3To5Benefits: string[];
    featureList: string[];
    emotionalTriggers: string[];
    objectionsToOvercome: string[];
    testimonials: {
        name: string;
        role: string;
        company: string;
        quote: string;
        image?: string | undefined;
    }[];
    trustIndicators: {
        type: "badge" | "certification" | "award" | "statistic";
        label: string;
        value?: string | undefined;
        image?: string | undefined;
    }[];
    primaryCTAText: string;
    formFields: {
        type: "text" | "email" | "phone" | "select" | "textarea" | "checkbox";
        name: string;
        label: string;
        required: boolean;
        options?: string[] | undefined;
        validation?: {
            pattern?: string | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
        } | undefined;
        placeholder?: string | undefined;
    }[];
    toneOfVoice: "formal" | "friendly" | "playful";
    pageLayoutPreference: "scroll" | "modular" | "storytelling";
    targetSEOKeywords: string[];
    privacyPolicyURL: string;
    gdprCCPAConsentText: string;
    secondaryCTAText?: string | undefined;
    apiConfig?: {
        endpoint: string;
        method: "POST" | "PUT";
        headers?: Record<string, string> | undefined;
    } | undefined;
    heroImage?: string | undefined;
    secondaryImages?: string[] | undefined;
    videoURL?: string | undefined;
    brandColorPalette?: string[] | undefined;
    fontStyleGuide?: string[] | undefined;
    logo?: string | undefined;
    eventTrackingSetup?: string[] | undefined;
    analyticsIDs?: {
        googleAnalytics?: string | undefined;
        googleTagManager?: string | undefined;
    } | undefined;
}, {
    campaignObjective: "lead-gen" | "sales" | "signup";
    primaryConversionKPI: string;
    targetAudience: string;
    buyerPersonaKeywords: string[];
    productServiceName: string;
    primaryOffer: string;
    uniqueValueProposition: string;
    top3To5Benefits: string[];
    featureList: string[];
    emotionalTriggers: string[];
    objectionsToOvercome: string[];
    testimonials: {
        name: string;
        role: string;
        company: string;
        quote: string;
        image?: string | undefined;
    }[];
    trustIndicators: {
        type: "badge" | "certification" | "award" | "statistic";
        label: string;
        value?: string | undefined;
        image?: string | undefined;
    }[];
    primaryCTAText: string;
    formFields: {
        type: "text" | "email" | "phone" | "select" | "textarea" | "checkbox";
        name: string;
        label: string;
        required: boolean;
        options?: string[] | undefined;
        validation?: {
            pattern?: string | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
        } | undefined;
        placeholder?: string | undefined;
    }[];
    toneOfVoice: "formal" | "friendly" | "playful";
    pageLayoutPreference: "scroll" | "modular" | "storytelling";
    targetSEOKeywords: string[];
    privacyPolicyURL: string;
    gdprCCPAConsentText: string;
    secondaryCTAText?: string | undefined;
    apiConfig?: {
        endpoint: string;
        method: "POST" | "PUT";
        headers?: Record<string, string> | undefined;
    } | undefined;
    heroImage?: string | undefined;
    secondaryImages?: string[] | undefined;
    videoURL?: string | undefined;
    brandColorPalette?: string[] | undefined;
    fontStyleGuide?: string[] | undefined;
    logo?: string | undefined;
    eventTrackingSetup?: string[] | undefined;
    analyticsIDs?: {
        googleAnalytics?: string | undefined;
        googleTagManager?: string | undefined;
    } | undefined;
}>;
export type CampaignInput = z.infer<typeof CampaignInputSchema>;
//# sourceMappingURL=validation.d.ts.map