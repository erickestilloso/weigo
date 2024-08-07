import SecondaryButton from "../SecondaryButton";
import PrimaryButton from "../PrimaryButton";

export default function ConfirmationModal({
    data,
    processing,
    onClickModal,
    onClickDelete,
}) {
    return (
        <div className="mt-2 p-6">
            <h2 className="font-bold mb-6">Are you sure with the changes?</h2>
            {data && (
                <p className="mb-6">
                    {data.email} &nbsp; {data.amount}
                </p>
            )}
            <div className="flex justify-between">
                <SecondaryButton onClick={() => onClickModal(false)}>
                    Cancel
                </SecondaryButton>

                <PrimaryButton
                    className="ms-3 bg-green-400"
                    disabled={processing}
                    onClick={() => {
                        onClickModal(false);
                        onClickDelete(data.uid);
                    }}
                >
                    Confirm
                </PrimaryButton>
            </div>
        </div>
    );
}
