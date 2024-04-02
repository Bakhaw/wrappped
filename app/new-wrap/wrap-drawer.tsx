"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Album } from "@prisma/client";

import { deleteWrap, saveWrap } from "@/app/api/wrap/methods";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Icons } from "@/components/ui/icons";

import AlbumCardList from "@/components/AlbumCardList";

interface DrawerWrapProps {
  albums: Album[];
  wrapId: string | undefined;
  year: string;
}

function WrapDrawer({ albums, wrapId, year }: DrawerWrapProps) {
  const { push } = useRouter();

  const [isSavingWrap, setIsSavingWrap] = useState(false);
  const [isDeletingWrap, setIsDeletingWrap] = useState(false);

  function isAlbumAddedToWrap(selectedAlbumId: string) {
    return Boolean(albums.find((album) => album.id === selectedAlbumId));
  }

  async function handleSaveButtonClick() {
    if (!year) return;

    setIsSavingWrap(true);

    const savedWrap = await saveWrap({
      albums,
      year,
    });

    if (savedWrap.status === 200) {
      push("/");
    }

    setIsSavingWrap(false);
  }

  async function handleDeleteButtonClick() {
    if (!wrapId) return;

    setIsDeletingWrap(true);

    const deletedWrap = await deleteWrap(wrapId);

    if (deletedWrap.status === 200) {
      push("/");
    }
  }

  // TODO ligne 102-103
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="bg-background">
          <Button
            variant="outline"
            className="uppercase fixed bottom-6 left-2 right-2 h-12 max-w-screen-lg mx-auto rounded-full text-background font-bold bg-second-gradient/80 hover:bg-second-gradient"
          >
            your {year} wrap
          </Button>
        </div>
      </DrawerTrigger>
      <DrawerPortal>
        <DrawerContent className="flex flex-col fixed bottom-0 left-0 right-0 max-h-full rounded-t-[10px]">
          <div className="max-w-md w-full mx-auto flex flex-col overflow-auto px-4 mt-4 rounded-t-[10px]">
            <DrawerHeader>
              <DrawerTitle className="uppercase">your {year} wrap</DrawerTitle>
            </DrawerHeader>
            <div className="p-4 pb-0">
              {year && (
                <div className="flex flex-col gap-4">
                  {albums?.length === 0 ? (
                    <div className="text-center md:text-left">
                      Your favorite <b>{year}</b> albums will be shown here
                    </div>
                  ) : (
                    <AlbumCardList
                      className="sm:grid-cols-2"
                      albums={albums}
                      isAlbumAddedToWrap={isAlbumAddedToWrap}
                      onAdd={() => {}}
                      onRemove={() => {}}
                      //   onAdd={addAlbumToSelection}
                      //   onRemove={removeAlbumFromSelection}
                    />
                  )}
                </div>
              )}

              <div className="flex flex-col gap-2">
                <Button
                  className="w-full mt-6 bg-second-gradient/80 hover:bg-second-gradient text-background font-bold"
                  disabled={
                    albums.length === 0 || isSavingWrap || isDeletingWrap
                  }
                  onClick={handleSaveButtonClick}
                >
                  {isSavingWrap && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Save
                </Button>
              </div>
            </div>

            <DrawerFooter>
              <Button
                className="w-full bg-destructive/80 hover:bg-destructive text-background font-bold"
                disabled={isDeletingWrap || isSavingWrap}
                onClick={handleDeleteButtonClick}
              >
                {isDeletingWrap && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Delete this wrap
              </Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
}

export default WrapDrawer;
