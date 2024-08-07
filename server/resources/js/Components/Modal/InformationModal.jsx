import SecondaryButton from "../SecondaryButton";

export default function InformationModal({ data, onClickModal }) {
    return (
        <div className="mt-2 p-6">
            <div className="overflow-x-auto max-h-[60vh] font-bold mb-5">
                Data Information
            </div>

            <div className="grid  pb-6 gap-4">
                <div className="flex gap-3 ">
                    {(data.firstName || data.lastName || data.name) && (
                        <p className="font-bold">
                            {data.firstName} {data.lastName}
                        </p>
                    )}
                    <p> {data.email && data.email}</p>
                    <p className="font-bold">{data.ccy && data.ccy}</p>
                </div>

                {data.telNo && (
                    <>
                        <p className="font-bold">Telephone Number:</p>
                        <p> {data.telNo && data.telNo}</p>
                    </>
                )}
                {data.address1 && (
                    <>
                        <p className="font-bold">Address 1:</p>
                        <p> {data.address1 && data.address1}</p>
                    </>
                )}
                {data.address2 && (
                    <>
                        <p className="font-bold">Address 2:</p>
                        <p> {data.address2 && data.address2}</p>
                    </>
                )}
                {(data.city || data.country || data.state) && (
                    <div className="flex gap-4">
                        <p>{data.city && data.city}</p>
                        <p>{data.country && data.country}</p>
                        <p>{data.state && data.state}</p>
                    </div>
                )}
                {data.description && (
                    <>
                        <p className="font-bold">Description:</p>
                        <p> {data.description && data.description}</p>
                    </>
                )}
            </div>

            <div className="flex justify-between">
                <SecondaryButton onClick={() => onClickModal(false)}>
                    Cancel
                </SecondaryButton>
            </div>
        </div>
    );
}
