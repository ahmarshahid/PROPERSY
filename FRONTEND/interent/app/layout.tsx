import "./globals.css";
import type { Metadata } from "next";


export const metadata: Metadata = {
title: "n8n Bid Console",
description: "Upload RFP & Company PDFs to n8n and render outputs"
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="en">
<body>{children}</body>
</html>
);
}