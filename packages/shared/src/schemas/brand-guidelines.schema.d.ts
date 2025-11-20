import { z } from 'zod';
export declare const BrandGuidelinesSchema: z.ZodObject<{
    colors: z.ZodObject<{
        primary: z.ZodArray<z.ZodString, "many">;
        secondary: z.ZodArray<z.ZodString, "many">;
        accent: z.ZodArray<z.ZodString, "many">;
        neutral: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        primary: string[];
        secondary: string[];
        accent: string[];
        neutral: string[];
    }, {
        primary: string[];
        secondary: string[];
        accent: string[];
        neutral: string[];
    }>;
    typography: z.ZodObject<{
        headings: z.ZodObject<{
            family: z.ZodArray<z.ZodString, "many">;
            sizes: z.ZodArray<z.ZodNumber, "many">;
            weights: z.ZodArray<z.ZodNumber, "many">;
            lineHeights: z.ZodArray<z.ZodNumber, "many">;
        }, "strip", z.ZodTypeAny, {
            family: string[];
            sizes: number[];
            weights: number[];
            lineHeights: number[];
        }, {
            family: string[];
            sizes: number[];
            weights: number[];
            lineHeights: number[];
        }>;
        body: z.ZodObject<{
            family: z.ZodArray<z.ZodString, "many">;
            sizes: z.ZodArray<z.ZodNumber, "many">;
            weights: z.ZodArray<z.ZodNumber, "many">;
            lineHeights: z.ZodArray<z.ZodNumber, "many">;
        }, "strip", z.ZodTypeAny, {
            family: string[];
            sizes: number[];
            weights: number[];
            lineHeights: number[];
        }, {
            family: string[];
            sizes: number[];
            weights: number[];
            lineHeights: number[];
        }>;
        captions: z.ZodObject<{
            family: z.ZodArray<z.ZodString, "many">;
            sizes: z.ZodArray<z.ZodNumber, "many">;
            weights: z.ZodArray<z.ZodNumber, "many">;
            lineHeights: z.ZodArray<z.ZodNumber, "many">;
        }, "strip", z.ZodTypeAny, {
            family: string[];
            sizes: number[];
            weights: number[];
            lineHeights: number[];
        }, {
            family: string[];
            sizes: number[];
            weights: number[];
            lineHeights: number[];
        }>;
    }, "strip", z.ZodTypeAny, {
        headings: {
            family: string[];
            sizes: number[];
            weights: number[];
            lineHeights: number[];
        };
        body: {
            family: string[];
            sizes: number[];
            weights: number[];
            lineHeights: number[];
        };
        captions: {
            family: string[];
            sizes: number[];
            weights: number[];
            lineHeights: number[];
        };
    }, {
        headings: {
            family: string[];
            sizes: number[];
            weights: number[];
            lineHeights: number[];
        };
        body: {
            family: string[];
            sizes: number[];
            weights: number[];
            lineHeights: number[];
        };
        captions: {
            family: string[];
            sizes: number[];
            weights: number[];
            lineHeights: number[];
        };
    }>;
    spacing: z.ZodObject<{
        xs: z.ZodNumber;
        sm: z.ZodNumber;
        md: z.ZodNumber;
        lg: z.ZodNumber;
        xl: z.ZodNumber;
        '2xl': z.ZodNumber;
        '3xl': z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
        '2xl': number;
        '3xl': number;
    }, {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
        '2xl': number;
        '3xl': number;
    }>;
    borderRadius: z.ZodObject<{
        sm: z.ZodNumber;
        md: z.ZodNumber;
        lg: z.ZodNumber;
        full: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        sm: number;
        md: number;
        lg: number;
        full: number;
    }, {
        sm: number;
        md: number;
        lg: number;
        full: number;
    }>;
    shadows: z.ZodObject<{
        sm: z.ZodString;
        md: z.ZodString;
        lg: z.ZodString;
        xl: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        sm: string;
        md: string;
        lg: string;
        xl: string;
    }, {
        sm: string;
        md: string;
        lg: string;
        xl: string;
    }>;
    logo: z.ZodObject<{
        primary: z.ZodString;
        secondary: z.ZodString;
        minWidth: z.ZodNumber;
        clearSpace: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        primary: string;
        secondary: string;
        minWidth: number;
        clearSpace: number;
    }, {
        primary: string;
        secondary: string;
        minWidth: number;
        clearSpace: number;
    }>;
    imagery: z.ZodObject<{
        style: z.ZodString;
        filters: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        style: string;
        filters: string[];
    }, {
        style: string;
        filters: string[];
    }>;
}, "strip", z.ZodTypeAny, {
    logo: {
        primary: string;
        secondary: string;
        minWidth: number;
        clearSpace: number;
    };
    colors: {
        primary: string[];
        secondary: string[];
        accent: string[];
        neutral: string[];
    };
    typography: {
        headings: {
            family: string[];
            sizes: number[];
            weights: number[];
            lineHeights: number[];
        };
        body: {
            family: string[];
            sizes: number[];
            weights: number[];
            lineHeights: number[];
        };
        captions: {
            family: string[];
            sizes: number[];
            weights: number[];
            lineHeights: number[];
        };
    };
    spacing: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
        '2xl': number;
        '3xl': number;
    };
    borderRadius: {
        sm: number;
        md: number;
        lg: number;
        full: number;
    };
    shadows: {
        sm: string;
        md: string;
        lg: string;
        xl: string;
    };
    imagery: {
        style: string;
        filters: string[];
    };
}, {
    logo: {
        primary: string;
        secondary: string;
        minWidth: number;
        clearSpace: number;
    };
    colors: {
        primary: string[];
        secondary: string[];
        accent: string[];
        neutral: string[];
    };
    typography: {
        headings: {
            family: string[];
            sizes: number[];
            weights: number[];
            lineHeights: number[];
        };
        body: {
            family: string[];
            sizes: number[];
            weights: number[];
            lineHeights: number[];
        };
        captions: {
            family: string[];
            sizes: number[];
            weights: number[];
            lineHeights: number[];
        };
    };
    spacing: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
        '2xl': number;
        '3xl': number;
    };
    borderRadius: {
        sm: number;
        md: number;
        lg: number;
        full: number;
    };
    shadows: {
        sm: string;
        md: string;
        lg: string;
        xl: string;
    };
    imagery: {
        style: string;
        filters: string[];
    };
}>;
export type BrandGuidelines = z.infer<typeof BrandGuidelinesSchema>;
//# sourceMappingURL=brand-guidelines.schema.d.ts.map