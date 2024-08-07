export default function RadioGroup({
    options,
    data,
    name,
    className = "",
    onChanges,
    onEventClicked,
    ...props
}) {
    return (
        <div className={className}>
            {options.map((option, index) => (
                <label key={index}>
                    <input
                        {...props}
                        type="radio"
                        name={name}
                        value={option.role}
                        checked={option.value}
                        className={
                            "rounded border-gray-300 text-indigo-400 shadow-sm focus:ring-indigo-400 "
                        }
                        onChange={(e) => {
                            onChanges(e);
                        }}
                    />
                    &nbsp; &nbsp; {option.role}
                </label>
            ))}
        </div>
    );
}
