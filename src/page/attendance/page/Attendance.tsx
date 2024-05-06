import AttendanceActions from "../AttendaceActions";
import AttendanceForm from "../AttendanceForm";

export default function Attendance() {
  
  return (
    <section className="flex flex-col gap-8 w-full">
    <h3 className="text-3xl">Aisitencias</h3>
    <div>
      <AttendanceActions />
    </div>
    <div className="flex gap-4">
      <AttendanceForm />
    </div>
    
  </section>
  )
}
