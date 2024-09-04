import ReccuringSlotsForm from "./ReccuringSlotsForm";
import SingleSlotForm from "./SingleSlotForm";

function AddSlotsHeader() {

  return (
		<div>
			<div className="flex justify-between">
				<div className="">
					<div className="text-3xl font-semibold  dark:text-gray-500">
						Slots:
					</div>
					<div className="text-sm font-semibold text-gray-300 dark:text-gray-600 hidden lg:block">
						You can add slots to support Mentees
					</div>
				</div>
			</div>
			
			<div className='grid grid-cols-1 md:grid-cols-2'>
				<SingleSlotForm />
				<ReccuringSlotsForm />
			</div>
		</div>
  );
}

export default AddSlotsHeader