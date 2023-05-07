import { AiOutlineClose } from "react-icons/ai";
import { FC, memo, ReactElement, useCallback } from "react";
import Button from "./Button";

interface ModalProps {
  title: string;
  isOpen?: boolean;
  disabled?: boolean;
  onClose: () => void;
  actionLabel: string;
  body?: ReactElement;
  onSubmit: () => void;
  footer?: ReactElement;
}

const Modal: FC<ModalProps> = ({
  body,
  title,
  isOpen,
  footer,
  onClose,
  onSubmit,
  disabled,
  actionLabel,
}) => {
  const handleClose = useCallback(() => {
    if (disabled) return;

    onClose();
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;

    onSubmit();
  }, [disabled, onSubmit]);
  if (!isOpen) return null;
  return (
    <>
      <div
        className="
        justify-center
        items-center
        flex
        overflow-x-hidden
        overflow-y-auto
        fixed
        inset-0
        z-50
        outline-none
        focus:outline-none
        bg-neutral-800
        bg-opacity-70
      "
      >
        <div
          className="
            relative
            w-full
            lg:w-3/6
            my-6
            mx-auto
            lg:max-w-3xl
            h-full
            lg:h-auto
          "
        >
          {/* Content */}
          <div
            className="
            flex
            w-full
            h-full
            relative
            flex-col
            border-0
            shadow-lg
            lg:h-auto
            rounded-lg
            bg-black
            outline-none
            focus:outline-none
          "
          >
            <div
              className="
                flex
                items-center
                justify-between
                p-10
                rounded-t
              "
            >
              <h3 className="text-3xl font-semibold text-white">{title}</h3>
              <button
                onClick={handleClose}
                className="
                  p-1
                  ml-auto
                  border-0
                  text-white
                  hover:opacity-70
                  transition
                "
              >
                <AiOutlineClose size={20} />
              </button>
            </div>
            {/* body */}
            <div className="relative p-10 flex-auto">{body}</div>
            {/* footer */}
            <div className="flex flex-col gap-2 p-10">
              <Button
                disabled={disabled}
                label={actionLabel}
                secondary
                fullWidth
                outline
                large
                onClick={handleSubmit}
              />
              {footer}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Modal);
