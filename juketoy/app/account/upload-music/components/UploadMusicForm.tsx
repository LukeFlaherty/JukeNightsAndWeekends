"use client";

import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useUser } from "@/hooks/useUser";
import uniqid from "uniqid";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

const UploadMusicForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user, userDetails } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    // upload to supabase here
    try {
      setIsLoading(true);

      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile || !songFile || !user) {
        toast.error("Missing fields");
        return;
      }

      const uniqueID = uniqid();

      // Upload song code
      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueID}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (songError) {
        setIsLoading(false);
        return toast.error("Failed song upload");
      }

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

      // if everything went right, create a record in the artist_songs table
      const { error: supabaseError } = await supabaseClient
        .from("artist_songs")
        .insert({
          title: values.title,
          artist_id: user.id, // assuming the artist's ID is the same as the user's ID
          song_path: songData.path,
          song_img_path: imageData.path, // Note: changed from image_path to song_img_path
        });

      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }

      router.refresh();
      setIsLoading(false);
      toast.success("Song created!");
      reset();
      // Assuming you want to close the modal if you're using it elsewhere
      // uploadModal.onClose();
    } catch (error) {
      toast.error("Something went wrong, try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="upload-form-container">
      <h2>Upload Your Music</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="title"
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder="Song title"
        />
        <div>
          <div className="pb-1">Select a song file</div>
          <Input
            id="song"
            type="file"
            disabled={isLoading}
            accept=".mp3"
            {...register("song", { required: true })}
          />
        </div>
        <div>
          <div className="pb-1">Select a cover image for your song</div>
          <Input
            id="image"
            type="file"
            disabled={isLoading}
            accept="image/*"
            {...register("image", { required: true })}
          />
        </div>
        <Button disabled={isLoading} type="submit">
          Upload
        </Button>
      </form>
    </div>
  );
};

export default UploadMusicForm;
