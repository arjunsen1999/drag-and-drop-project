import { fetchPosts } from "@/apis/mock.api";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

// Types
type Post = { _id: string; name: string };
type FetchResponse = {
  posts: Post[];
  total: number;
  currentPage: number;
  limit: number;
  totalPage: number;
};

export default function ListOfPostComponent() {
  const [postData, setPostData] = useState<Post[]>([]);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchPosts(limit, currentPage, search)
      .then((res) => {
        const response = res as FetchResponse;
        setPostData(response?.posts || []);
        setTotalPage(response?.totalPage);
      })
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, search]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const updated = Array.from(postData);
    const [moved] = updated.splice(source.index, 1);
    updated.splice(destination.index, 0, moved);

    setPostData(updated);
  };

  const handleLeft = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleRight = () => {
    if (currentPage < totalPage) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="w-full flex flex-col items-center gap-5">
      {/* Banner */}
      <div className="w-[90vw] bg-blue-600 h-[200px] rounded-2xl !mt-8 flex flex-col justify-center !px-8">
        <h1 className="text-2xl font-semibold text-white">List Page</h1>
        <p className="text-white text-sm">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias
          voluptates architecto aliquid illum dignissimos molestiae dolorum
          dolor, ducimus unde repellat ratione debitis dolore cupiditate libero
          quis labore. Quia enim rerum voluptatem rem harum debitis quod
          accusantium in quasi, assumenda cupiditate fugiat, eius iste dolore
          voluptatibus sapiente atque qui eveniet culpa at sequi magni quaerat,
          voluptates maxime? Facere sequi obcaecati odio dolorum aperiam labore
          rerum laborum totam sed doloremque blanditiis odit autem recusandae
          magni dignissimos praesentium dicta error, ex aut itaque nisi fugiat?
          Obcaecati laudantium et nemo id culpa quibusdam architecto, sunt
          tenetur adipisci quisquam a ex molestiae ratione facere fugiat
          voluptatum error nisi mollitia maxime voluptas! Repudiandae saepe, sit
          quibusdam temporibus incidunt iure omnis. Tenetur accusamus nemo dicta
          qui asperiores.....
        </p>
      </div>

      <div className="w-[90vw] flex items-center justify-between !mt-5">
        <h1 className="text-lg font-semibold">List Of the Post</h1>
        <input
          type="text"
          value={search}
          className="border border-gray-400 outline-0 !py-3 !px-6 rounded-2xl"
          placeholder="Search....."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {isLoading ? (
        <div className="w-[90vw] !mt-5 flex items-center justify-center gap-2">
          <Loader2 className="animate-spin" />
          <span>Loading....</span>
        </div>
      ) : (
        <div className="w-[90vw] !mt-5 flex flex-col gap-5">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="list">
              {(droppableProvided) => (
                <ul
                  className="w-full flex flex-col gap-5"
                  ref={droppableProvided.innerRef}
                  {...droppableProvided.droppableProps}
                >
                  {postData?.map((ele, index) => (
                    <Draggable
                      key={ele._id}
                      draggableId={String(ele._id)}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <li
                          className={`w-full ${
                            snapshot.isDragging ? "bg-gray-200" : "bg-gray-50"
                          } !px-4 !py-3 font-semibold text-sm relative`}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <div className="absolute w-[4px] h-full bg-blue-600 top-0 left-0"></div>
                          <span>{ele._id}. </span>
                          <span>{ele.name || "No Name"}</span>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {droppableProvided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      )}

      {totalPage > 1 && !isLoading && (
        <div className="w-[90vw] flex items-center justify-center gap-4 !mb-8">
          <div
            onClick={handleLeft}
            className="w-[40px] h-[40px] bg-gray-100 rounded-md cursor-pointer flex items-center justify-center hover:bg-gray-200"
          >
            <ChevronLeft />
          </div>
          <div className="w-[40px] h-[40px] bg-blue-600 flex items-center justify-center rounded-full text-white font-semibold">
            {currentPage}
          </div>
          <div
            onClick={handleRight}
            className="w-[40px] h-[40px] bg-gray-100 rounded-md cursor-pointer flex items-center justify-center hover:bg-gray-200"
          >
            <ChevronRight />
          </div>
        </div>
      )}
    </div>
  );
}
