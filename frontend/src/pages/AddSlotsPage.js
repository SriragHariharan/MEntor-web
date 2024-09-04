import { useEffect, useState } from "react";
import AddSlotsHeader from "../components/mentor/AddSlotsHeader";
import SlotsTable from "../components/mentor/SlotsTable";
import { axiosInstance } from "../helpers/axios";
import { useDispatch, useSelector } from "react-redux"
import { addSlots } from "../redux toolkit/slotSlice";

function AddSlotsPage() {
	const[date, setDate] = useState(new Date().toISOString().split('T')[0]);
	const dispatch = useDispatch();

	//get slots details on page load 
	useEffect(() =>{
		axiosInstance.post(process.env.REACT_APP_INTERVIEW_SVC_ENDPOINT + "/slots/me",{date})
		.then(resp => dispatch(addSlots(resp.data?.data?.slots)))
		.catch(err => console.log(err));
	},[date])

	//select slots from store
	const slots = useSelector(store => store?.slots?.selectedSlots)

  return (
		<div className="py-10 dark:bg-gray-800 px-4 lg:px-12">
			<AddSlotsHeader />
			<SlotsTable slots={slots} setDate={setDate} />
		</div>
  );
}

export default AddSlotsPage