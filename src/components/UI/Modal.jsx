import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

const Modal = ({ children, className, open, setOpen }) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-center justify-center min-h-screen mx-auto py-8 px-16 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-70" />
          <div className="relative text-left">{children}</div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
