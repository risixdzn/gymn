import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/app/(logged-in)/dashboard/gym/data-table";
import { columns } from "@/app/(logged-in)/dashboard/gym/affiliates-columns";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonGymAffiliates = () => {
    return (
        <>
            <div className='flex w-full justify-between items-center py-4 gap-2'>
                <Skeleton className='w-full h-10 max-w-sm rounded-md' />
                <Skeleton className='w-36 h-10 rounded-md' />
            </div>
            <Skeleton className='w-full h-96 rounded-md' />
        </>
    );
};

export default function GymAffiliates() {
    const { data, isLoading } = useQuery({
        queryKey: ["affiliates"], //key and params to define the query
        queryFn: () => {
            //function called on querying
            return axios.get(`/api/affiliates`).then((res) => res.data);
        },
        retry: false,
    });
    if (!data) {
        return <SkeletonGymAffiliates />;
    }

    return <DataTable columns={columns} data={data?.data} />;
}
