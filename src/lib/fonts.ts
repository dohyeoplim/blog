import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";

/*
Pretendard

Copyright (c) 2021 Kil Hyung-jin, with Reserved Font Name Pretendard.
https://github.com/orioncactus/pretendard

This Font Software is licensed under the SIL Open Font License, Version 1.1.
This license is copied below, and is also available with a FAQ at:
http://scripts.sil.org/OFL
*/
export const pretendard = localFont({
    src: "../../public/static/fonts/PretendardVariable.woff2",
    display: "swap",
    weight: "45 920",
    variable: "--font-pretendard",
});

/*
JetBrains Mono

Copyright 2020 The JetBrains Mono Project Authors (https://github.com/JetBrains/JetBrainsMono)
This Font Software is licensed under the SIL Open Font License, Version 1.1 . This license is copied below, and is also available with a FAQ at: https://openfontlicense.org

SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007
 */
export const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    display: "swap",
    weight: ["400", "700"],
    variable: "--font-jetbrains-mono",
});
