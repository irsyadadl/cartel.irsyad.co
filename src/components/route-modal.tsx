"use client"

import { ModalClose, Modal, ModalContent, ModalHeader } from "@/components/ui/modal"
import { useRouter } from "next/navigation"

interface RouteModalProps
  extends React.ComponentProps<typeof ModalContent>,
    Pick<React.ComponentProps<typeof ModalHeader>, "title" | "description"> {}

export function RouteModal({ title, description, size = "xl", children }: RouteModalProps) {
  const router = useRouter()
  return (
    <Modal
      defaultOpen
      onOpenChange={(open) => {
        if (!open) {
          router.back()
        }
      }}
    >
      <ModalContent size={size}>
        <>
          <ModalHeader {...{ title, description }} />
          {children}
        </>
      </ModalContent>
    </Modal>
  )
}

export function RouteModalClose() {
  const router = useRouter()
  return <ModalClose onPress={() => router.back()}>Cancel</ModalClose>
}
