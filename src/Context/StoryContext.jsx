/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import { createContext, useContext, useState } from "react"

const StoryContext = createContext(null);

export const StoryProvider = ({children}) => {
    const [storyFile, setStoryFile] = useState(null);

    return(
        <StoryContext value={{storyFile, setStoryFile}}>
            {children}
        </StoryContext>
    )
};

export const useStory = () => {
    const context = useContext(StoryContext);

    if(!context) {
        throw new Error("useStory must be used inside StoryProvider")
    }

    return context;
}