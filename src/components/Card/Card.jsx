import React, { useEffect, useState } from 'react';
import Buttons from '../Buttons/Buttons';
import SingleData from '../SingleData/SingleData';
import Modal from '../Modal/Modal';

const Card = () => {
    const [data, setData] = useState([]);
    const [singleData, setSingleData] = useState({});
    const [showAll, setShowAll] = useState(false);
    const [uniqueId, setUniqueId] = useState(null);

    const handleSort = () => {
        const sortedData = data.sort((a, b) => {
            return new Date(b.published_in) - new Date(a.published_in);
        });
        setData([...data, sortedData]);
    }

    const handleShowAll = () => {
        setShowAll(true);
    };

    useEffect(() => {
        const loadData = async () => {
            const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
            const value = await res.json();
            // console.log(value.data.tools);
            setData(value.data.tools);
        };

        loadData();
    }, []);

    useEffect(() => {
        // console.log("hello from useEffect");
        fetch(`https://openapi.programming-hero.com/api/ai/tool/${uniqueId}`)
            .then((res) => res.json())
            .then((data) => setSingleData(data.data));
    }, [uniqueId]);

    return (
        <>
            <span onClick={handleSort}>
                <Buttons>Sort By Date</Buttons>
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:px-12 my-6">
                {/* {
                    data.map(singleData => {
                        // console.log(singleData);
                        return <SingleData singleData={singleData} key={singleData.id} />
                    })
                } */}
                {
                    data?.slice(0, showAll ? 12 : 6).map(singleData => (
                        <SingleData 
                            singleData={singleData} 
                            key={singleData.id} 
                            setUniqueId={setUniqueId}
                        />
                    ))
                }
            </div>
            {
                !showAll && (
                    <span onClick={handleShowAll}>
                        <Buttons>See More</Buttons>
                    </span>
                )
            }
            <Modal singleData={singleData} />
        </>
    );
};

export default Card;