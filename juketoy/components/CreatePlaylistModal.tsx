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
      title: "",
      description: "",
      image: null,
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

      const imageFile = values.image?.[0]; // Grab the image file

      const uniqueID = uniqid();

      // Upload Image code
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`image-${values.title}-${uniqueID}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });

      if (imageError) {
        setIsLoading(false);
        return toast.error("Failed image upload");
      }

      const { error: supabaseError } = await supabaseClient
        .from("playlists")
        .insert({
          user_id: user.id,
          title: values.title,
          description: values.description,
          image_path: imageData.path,
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
        <Input
          id="description"
          disabled={isLoading}
          {...register("description", { required: true })}
          placeholder="How would you describe this playlist?"
        />
        <div>
          <div className="pb-1">Select a cover image for your playlist</div>
          <Input
            id="image"
            type="file"
            disabled={isLoading}
            accept="image/*"
            {...register("image", { required: true })}
          />
        </div>
        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default CreatePlaylistModal;
