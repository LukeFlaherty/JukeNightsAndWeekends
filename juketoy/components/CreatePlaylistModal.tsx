"use client";

import useCreatePlaylistModal from "@/hooks/useCreatePlaylistModal"; // CreatePlaylistModal hook
import Modal from "./Modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import uniqid from "uniqid";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

const CreatePlaylistModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const createPlaylistModal = useCreatePlaylistModal(); // Use the create playlist modal hook
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      playlistName: "",
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      // reset form
      createPlaylistModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      if (!user) {
        toast.error("User not authenticated");
        return;
      }

      const uniqueID = uniqid();

      const { error: supabaseError } = await supabaseClient
        .from("playlists")
        .insert({
          user_id: user.id,
          title: values.title,
          description: values.description,
          // Add additional properties if needed
        });

      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }

      router.refresh();
      setIsLoading(false);
      toast.success("Playlist created!");
      reset();
      createPlaylistModal.onClose();
    } catch (error) {
      toast.error("Something went wrong, try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Create Playlist"
      description="Create a new playlist"
      isOpen={createPlaylistModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="title"
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder="Playlist title"
        />
        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default CreatePlaylistModal;
