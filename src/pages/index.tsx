import type { NextPage } from 'next'
import React from "react";

const Home: NextPage = () => {

    const [isLoading, setIsLoading] = React.useState(false);
    const inputFileRef = React.useRef<HTMLInputElement | null>(null);

    const handleOnClick = async (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();

        if (!inputFileRef.current?.files?.length) {
            alert('Please, select file you want to upload');
            return;
        }

        setIsLoading(true);

        const formData = new FormData();
        Object.values(inputFileRef.current.files).forEach(file => {
            formData.append('file', file);
        })

        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });

        const body = await response.json() as { status: 'ok' | 'fail', message: string };

        alert(body.message);

        if (body.status === 'ok') {
            inputFileRef.current.value = '';
        } else {
        }
        setIsLoading(false);
    };

    return (
        <form>
            <div>
                <input type="file" name="myfile" ref={inputFileRef} />
            </div>
            <div>
                <input type="submit" value="Upload" disabled={isLoading} onClick={handleOnClick} />
                {isLoading && ` Wait, please...`}
            </div>
        </form>
    )
}

export default Home