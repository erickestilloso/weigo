import TextInput from "../TextInput";

export default function InputDropdown() {
    const [isOption, setIsOption] = useState(false);
    return (
        <div>
            <TextInput onClick={() => setIsOption(true)}></TextInput>
            {isOption && (
                <>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                </>
            )}
        </div>
    );
}
