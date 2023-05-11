import axios from "axios";
import Modal from "../Modal";
import Input from "../Input";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";

const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }

    registerModal.onClose();
    loginModal.onOpen();
  }, [isLoading, registerModal, loginModal]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.post("api/register", {
        name,
        email,
        password,
        username,
      });

      toast.success("Account created.");

      signIn("credentials", {
        email,
        password,
      });

      registerModal.onClose();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }, [registerModal, email, name, password, username]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        value={email}
        placeholder="Email"
        disabled={isLoading}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        value={name}
        placeholder="Name"
        disabled={isLoading}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        value={username}
        disabled={isLoading}
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="password"
        value={password}
        disabled={isLoading}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        Already have an account?{" "}
        <span
          className="text-white cursor-pointer hover:underline"
          onClick={onToggle}
        >
          Sign in
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      body={bodyContent}
      onSubmit={onSubmit}
      disabled={isLoading}
      actionLabel="Register"
      footer={footerContent}
      title="Create an account"
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
    />
  );
};

export default RegisterModal;
