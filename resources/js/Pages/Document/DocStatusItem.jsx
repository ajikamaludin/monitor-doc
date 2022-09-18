import { statuses } from "@/utils";
import React from "react";

export default function DocStatusItem({ status }) {
    const stat = statuses.find(i => i.key == status)
    return (
        <p style={{color: stat.color}}>{stat.value}</p>
    )
}