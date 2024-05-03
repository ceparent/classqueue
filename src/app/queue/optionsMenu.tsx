'use client'

import { Avatar, Select, SelectItem, Slider, Spacer } from "@nextui-org/react"
import React, { ChangeEvent } from "react"
import { useEffect, useState } from "react"



type Props = {
    setStudentCount: React.Dispatch<React.SetStateAction<number>>,
    setVolume: React.Dispatch<React.SetStateAction<number>>,
    setVoice: React.Dispatch<React.SetStateAction<string>>,
}



const OptionsMenu: React.FC<Props> = ({ setStudentCount, setVolume, setVoice }) => {

    const [showMenu, setShowMenu] = useState<boolean | undefined>()
    const [theme, setTheme] = useState<string>('dark')
    const [lastTheme, setLastTheme] = useState<string>('dark');
    const [localStudentCount, setLocalStudentCount] = useState<number>(25)
    const [localVolume, setLocalVolume] = useState<number>(100)
    const [localVoice, setLocalVoice] = useState<string>("m")

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    useEffect(() => {
        setTheme(localStorage.getItem("theme") || "dark")
        setStudentCount(parseInt(localStorage.getItem("studentCount") || "25"))
        setLocalStudentCount(parseInt(localStorage.getItem("studentCount") || "25"))
        setVoice(localStorage.getItem("voice") || "m")
        setLocalVoice(localStorage.getItem("voice") || "m")
    }, [])

    useEffect(() => {
        changeTheme(theme)
    }, [theme]);


    function changeTheme(themeName: string) {
        let body = document.querySelector("body");
        if (body != null) {
            body.classList.remove(lastTheme)
            body.classList.add(theme)
            body.classList.add("text-foreground")
            body.classList.add("background")
            setLastTheme(theme);
        }

    }



    const handleStudentCountSliderChange = (newValue: number | number[]) => {
        if (typeof (newValue) === "number") {
            setStudentCount(newValue)
            setLocalStudentCount(newValue)
            localStorage.setItem("studentCount", newValue.toString())
        }
        else {
            setStudentCount(newValue[0])
            setLocalStudentCount(newValue[0])
            localStorage.setItem("studentCount", newValue[0].toString())
        }

    }

    const handleVolumeSliderChange = (newValue: number | number[]) => {
        if (typeof (newValue) === "number") {
            (newValue)
            setVolume(newValue)
            setLocalVolume(newValue)
            localStorage.setItem("volume", newValue.toString())
        }
        else {
            setVolume(newValue[0])
            setLocalVolume(newValue[0])
            localStorage.setItem("volume", newValue[0].toString())
        }

    }

    const handleThemeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setTheme(e.target.value);
        localStorage.setItem("theme", e.target.value)
    }

    const handleVoiceChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setVoice(e.target.value);
        setLocalVoice(e.target.value)
        localStorage.setItem("voice", e.target.value)
    }

    return (
        <>
            <div className="menu">
                <img className="menu-icon" src="/icons/settings.png" onClick={toggleMenu}></img>

            </div>
            <div className={showMenu === undefined ? "menu-sidebar" : showMenu ? "menu-sidebar open" : "menu-sidebar close"} >
                <Slider
                    size="md"
                    step={1}
                    color="primary"
                    label="Nombre d'élèves"
                    showSteps={false}
                    maxValue={35}
                    minValue={10}
                    value={localStudentCount}
                    className="max-w-md"
                    onChange={handleStudentCountSliderChange}
                />

                <Spacer y={6} />
                <Select
                    className="max-w-sm"
                    label="Thème"
                    labelPlacement="outside"
                    onChange={handleThemeChange}
                    disallowEmptySelection={true}
                    startContent={<Avatar alt="" className="w-6 h-6" src={"/icons/" + theme + ".png"} />}
                    selectedKeys={[theme]}
                >
                    <SelectItem
                        key="dark"
                        startContent={<Avatar alt="Bleu/Noir" className="w-6 h-6" src="/icons/dark.png" />}
                    >
                        Bleu/Noir
                    </SelectItem>
                    <SelectItem
                        key="light"
                        startContent={<Avatar alt="Bleu/Blanc" className="w-6 h-6" src="icons/light.png" />}
                    >
                        Bleu/Blanc
                    </SelectItem>

                </Select>

                <Spacer y={6} />

                <Slider
                    size="md"
                    step={1}
                    color="primary"
                    label="Volume"
                    showSteps={false}
                    maxValue={100}
                    minValue={0}
                    value={localVolume}
                    className="max-w-md"
                    onChange={handleVolumeSliderChange}

                />
                <Spacer y={6} />

                <Select
                    className="max-w-sm"
                    label="Voix"
                    disallowEmptySelection={true}
                    startContent={<Avatar alt="Bleu/Noir" className="w-6 h-6" src={"/icons/voice_" + localVoice + ".jpg"} />}
                    labelPlacement="outside"
                    selectedKeys={[localVoice]}
                    onChange={handleVoiceChange}

                >
                    <SelectItem
                        key="m"
                        startContent={<Avatar alt="Bleu/Noir" className="w-6 h-6" src="/icons/voice_m.jpg" />}
                    >
                        M. Charles-Étienne
                    </SelectItem>
                    <SelectItem
                        key="s"
                        startContent={<Avatar alt="Bleu/Blanc" className="w-6 h-6" src="/icons/voice_s.jpg" />}
                    >
                        Mme. Sophie
                    </SelectItem>

                </Select>

            </div>


        </>
    )
}

export default OptionsMenu;