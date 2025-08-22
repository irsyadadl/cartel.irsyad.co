import {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal"
import { Button } from "@/components/ui/button"

interface AlertDialogProps extends Omit<React.ComponentProps<typeof Modal>, "children"> {
  title?: string
  description?: string
  submitText?: string
  intent?: "primary" | "secondary" | "danger"
}

export function AlertDialog({
  title,
  description,
  submitText,
  isOpen,
  onOpenChange,
  intent = "primary",
  ...rest
}: AlertDialogProps) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} {...rest}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{title ?? "Confirm Action"}</ModalTitle>
          <ModalDescription>
            {description ??
              "Are you sure you want to proceed with this action? This action cannot be undone."}
          </ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <ModalClose>Cancel</ModalClose>
          <Button intent={intent} onPress={() => onOpenChange?.(false)}>
            {submitText ?? "Confirm"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
