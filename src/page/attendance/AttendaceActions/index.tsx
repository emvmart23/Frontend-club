import api from "@/service";
import AttendanceDataTable from "../AttendaceDataTable";
import { useQuery } from "react-query";
import { Button } from '@/components/ui/Button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/Dialog'
import { useState } from 'react'


const getAttendance = async () => {
    const { data } = await api.get('/attendances')
    return data
}
export default function AttendanceActions() {
   const [isOpen, setIsOpen] = useState(false);
   const { data, isLoading } = useQuery("Attendance", getAttendance)
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Registro</Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-2xl h-[30rem]">
        <AttendanceDataTable data={data ? data.attendances : []} isLoading={isLoading} />
      </DialogContent>
    </Dialog>
  )
}
