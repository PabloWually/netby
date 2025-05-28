import { Box,
  Modal,
  ModalProps,
} from "@mui/material"

export const StyledModal = (props: ModalProps) => {
  return (
    <Modal
      {...props}
    >
      <Box sx={ModalContainer}>
        {props.children}
      </Box>
    </Modal>
  )
}

const ModalContainer = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: { xs: 2, sm: 4 },
  m: 0,
  overflow: "auto",
  width: { xs: "98vw", sm: "auto" },
};
