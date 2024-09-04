import CreateRoomForm from "../components/rooms/CreateRoomForm";
import SingleRoomCard from "../components/rooms/SingleRoomCard";
import useActiveRooms from "../hooks/useActiveRooms";

function Rooms({ mentor }) {
    const {activeRooms, error} = useActiveRooms();
    console.log(activeRooms)

  return (
    <div className="grid grid-cols-4 gap-4 py-12 dark:bg-gray-800">
      <div className="col-span-4 md:col-span-3">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {
                activeRooms?.map( room => <SingleRoomCard details={room} mentor={mentor} /> )
            }
            {
                (activeRooms?.length === 0) && <div className="text-center text-3xl text-gray-400">No active rooms present</div>
            }
        </div>
      </div>
      <div className="col-span-4 md:col-span-1 md:me-2 fixed right-0">
        <CreateRoomForm />
      </div>
    </div>
  );
}

export default Rooms;
