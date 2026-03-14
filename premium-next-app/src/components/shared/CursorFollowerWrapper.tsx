"use client";

import dynamic from "next/dynamic";

const CursorFollower = dynamic(() => import("./CursorFollower"), { ssr: false });

export default function CursorFollowerWrapper() {
    return <CursorFollower />;
}
