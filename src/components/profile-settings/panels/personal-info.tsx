import React, { useState } from "react";
import { Input, Btn } from "../primitives";
import axios from "../../../lib/axios";

interface PanelProps {
  onClose: () => void;
}

export default function EditPersonalInfo({ onClose }: PanelProps) {
  const [username, setUsername] = useState("Sarah Nielsen");
  const [email, setEmail] = useState("sarah@example.com");
  const [phone, setPhone] = useState("+1 555 000 1234");

  const handleClick = async () => {
    try {
      await axios.patch("/api/auth/update-info", {
        username,
        email,
        phone,
      });

      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Input
        label="Full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        label="Phone"
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <div className="flex gap-3 mt-6">
        <Btn onClick={handleClick}>Save changes</Btn>
        <Btn variant="ghost" onClick={onClose}>
          Cancel
        </Btn>
      </div>
    </>
  );
}