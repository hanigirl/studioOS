"use client"

import { Archive, Copy, Figma, Link2, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { PulseProject } from "./types"

export function ProjectActionsMenu({ project }: { project: PulseProject }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={`Actions for ${project.name}`}
          onClick={(e) => e.stopPropagation()}
        >
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
        <DropdownMenuItem
          onSelect={() =>
            window.open(project.figmaLink, "_blank", "noopener,noreferrer")
          }
        >
          <Figma />
          Open in Figma
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Copy />
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Archive />
          Archive
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => {
            const url = `${window.location.origin}/projects/${project.id}`
            navigator.clipboard?.writeText(url)
          }}
        >
          <Link2 />
          Copy link
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
