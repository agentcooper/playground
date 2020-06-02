/**
 * Relationship between values and functions can be encoded with types.
 * This can be useful when building domain specific languages.
 * Such APIs remove the need to declare values before use.
 */

interface PageDescriptor<PageName extends string> {
    name: PageName;
}

declare function Page<PageName extends string>(name: PageName): PageDescriptor<PageName>;
declare function navigate(page: PageNames): void;

type PageNames = (typeof pages)[number]["name"];

// Some DSL

const additionalPages = [Page("payments")];

export const pages = [
    Page("profile"),
    Page("feed"),
    Page("settings"),
    ...additionalPages
];

navigate("profile"); // should type check
navigate("payments"); // should type check

navigate("missing"); // should error
