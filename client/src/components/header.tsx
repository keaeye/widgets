import {useContext, useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import ReactModal from "react-modal";
import {removeCookie} from "typescript-cookie";
import {Link, useLocation} from "wouter";
import {useLoginModal} from "../hooks/useLoginModal";
import {Profile, ProfileContext} from "../state/profile";
import {Button} from "./ui/button";
import {IconSmall} from "./icon";
import {Input} from "./input";
import {Padding} from "./padding";
import {Customizer, CustomizerWrapper} from "./theme/ThemeCustomizer";
import {Card} from "./ui/card";
import {useKBar} from "kbar";
import {Popover, PopoverContent, PopoverTrigger} from "./ui/popover";
import * as React from "react";
import { Drawer, DrawerContent, DrawerTrigger } from '@/ui/drawer'
import {Paintbrush, SquareMousePointer, Link as LinkIcon} from "lucide-react";
import {cn} from "../utils/utils";
import HideOnScroll from "./hide-on-scroll";

export function Header({children}: { children?: React.ReactNode }) {
  const profile = useContext(ProfileContext);
  const {t} = useTranslation();

  return useMemo(() => (
    <>
      <HideOnScroll distance={100} direction="down">
        <div className="fixed z-40">
          <div className="w-screen">
            <Padding className="mx-4 mt-4">
              <div className="w-full flex justify-between items-center">
                <Link aria-label={t('home')} href="/"
                      className="hidden opacity-0 md:opacity-100 duration-300 mr-auto md:flex flex-row items-center hover:text-primary-500 dark:hover:text-primary-500 text-gray-700 dark:text-gray-300">
                  <img src={process.env.AVATAR} alt="Avatar" className="w-12 h-12 rounded-2xl border-2"/>
                  <div className="flex flex-col justify-center items-start mx-4">
                    <p className="text-xl font-bold">
                      {process.env.NAME}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {process.env.DESCRIPTION}
                    </p>
                  </div>
                </Link>
                <Card
                  className="w-full md:w-max transition-all duration-500 md:absolute md:left-1/2 md:translate-x-[-50%] flex-row justify-center items-center">
                  <div
                    className="flex flex-row items-center t-primary px-2">
                    <Link aria-label={t('home')} href="/"
                          className="visible opacity-100 md:hidden md:opacity-0 duration-300 mr-auto flex flex-row items-center py-2">
                      <img src={process.env.AVATAR} alt="Avatar"
                           className="w-10 h-10 border-2"/>
                      <div className="flex flex-col justify-center items-start mx-2">
                        <p className="text-sm font-bold">
                          {process.env.NAME}
                        </p>
                        <p className="text-xs text-neutral-500">
                          {process.env.DESCRIPTION}
                        </p>
                      </div>
                    </Link>
                    <NavBar menu={false}/>
                    {children}
                    <Menu/>
                  </div>
                </Card>
                <div
                  className="ml-auto hidden opacity-0 md:opacity-100 duration-300 md:flex flex-row items-center space-x-2">
                  <SearchButtonUseKBar/>
                  <LanguageSwitch/>
                  <UserAvatar profile={profile}/>
                  <CustomizerWrapper/>
                  <GithubSourceCodeUrl/>
                </div>
              </div>
            </Padding>
          </div>
        </div>
        <div className="h-20"></div>
      </HideOnScroll>
    </>
  ), [profile, children])
}

function NavItem({menu, title, selected, href, when = true, onClick}: {
  title: string,
  selected: boolean,
  href: string,
  menu?: boolean,
  when?: boolean,
  onClick?: () => void
}) {
  return (
    <>
      {when &&
      <Link href={href}
            className={`${menu ? "" : "hidden"} md:block cursor-pointer duration-300 px-2 py-4 md:p-4 text-sm ${selected ? "text-primary" : ""}`}
            state={{animate: true}}
            onClick={onClick}
      >
        {title}
      </Link>}
    </>
  )
}

function Menu() {
  const profile = useContext(ProfileContext);

  return (
    <div className="visible md:hidden flex flex-row items-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost"
                  className="w-10 h-10 flex rounded-full border dark:border-neutral-600 px-2 bg-w aspect-[1] items-center justify-center t-primary bg-button">
            <i className="ri-menu-line ri-lg dark:text-white"/>
            {/*{!open && <SquareDashedMousePointer className="h-5 w-5" />}*/}
            <span className="sr-only">Customize</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[350px] p-2">
          <div className="flex flex-col rounded-xl p-2 mt-4 w-[50vw]">
            <div className="flex flex-row justify-end space-x-2">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="ghost" className="w-10 h-10 flex rounded-full border dark:border-neutral-600 px-2 bg-w aspect-[1] items-center justify-center t-primary bg-button">
                    <Paintbrush className="h-4 w-4" />
                    <span className="sr-only">Customize</span>
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="p-0 pt-0">
                  <Customizer />
                </DrawerContent>
              </Drawer>
              <SearchButtonUseKBar/>
              <LanguageSwitch/>
              <UserAvatar profile={profile}/>
              <GithubSourceCodeUrl />
            </div>
            <NavBar menu={true}/>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

function NavBar({menu, onClick}: { menu: boolean, onClick?: () => void }) {
  const profile = useContext(ProfileContext);
  const [location] = useLocation();
  const {t} = useTranslation()
  return (
    <>
      <NavItem menu={menu} onClick={onClick} title={t('article.title')}
               selected={location === "/" || location.startsWith('/feed')} href="/"/>
      <NavItem menu={menu} onClick={onClick} title={t('timeline')} selected={location === "/timeline"}
               href="/timeline"/>
      <NavItem menu={menu} onClick={onClick} title={t('hashtags')} selected={location === "/hashtags"}
               href="/hashtags"/>
      <NavItem menu={menu} onClick={onClick} when={profile?.permission == true} title={t('writing')}
               selected={location.startsWith("/writing")} href="/writing"/>
      <NavItem menu={menu} onClick={onClick} title={t('friends.title')} selected={location === "/friends"}
               href="/friends"/>
      <NavItem menu={menu} onClick={onClick} title={t('about.title')} selected={location === "/about"} href="/about"/>
      <NavItem menu={menu} onClick={onClick} when={profile?.permission == true} title={t('settings.title')}
               selected={location === "/settings"}
               href="/settings"/>
    </>
  )
}

function LanguageSwitch({className}: { className?: string }) {
  const {i18n} = useTranslation()
  const label = 'Languages'
  const languages = [
    {code: 'en', name: 'English'},
    {code: 'zh', name: '简体中文'},
    {code: 'ja', name: '日本語'}
  ]
  return (
    <div className={className + " flex flex-row items-center"}>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost"
                  className="flex rounded-full border dark:border-grey-600 px-2 bg-primary aspect-[1] items-center justify-center t-primary bg-button">
            <i className="ri-translate-2 dark:text-white"></i>
            {/*{!open && <SquareDashedMousePointer className="h-5 w-5" />}*/}
            <span className="sr-only">{label}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2">
          <div className="border-card flex flex-col items-center">
            <p className='font-bold t-primary'>
              Languages
            </p>
            {languages.map(({code, name}) => (
              <button className={cn(code === i18n.language && 'text-primary')} key={code} onClick={() => i18n.changeLanguage(code)}>
                {name}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

function SearchButtonUseKBar() {
  const {query} = useKBar();
  const {t} = useTranslation()
  const label = t('article.search.title')
  return (
    <>
      <Button
        onClick={() => query.toggle()}
        title={label}
        variant="ghost"
        aria-label={label}
        className="flex rounded-full border dark:border-neutral-600 px-2 aspect-[1] items-center justify-center">
        <i className="ri-search-line dark:text-white"></i>
      </Button>
    </>
  )
}

function GithubSourceCodeUrl() {
  return (
    <>
      <Button onClick={() => window.location.href = "https://github.com/keaeye"} variant="ghost" className="flex rounded-full border dark:border-grey-600 px-2 bg-primary aspect-[1] items-center justify-center t-primary bg-button">
        <LinkIcon className="h-4 w-4 dark:text-white" />
        <span className="sr-only">Github Source Code</span>
      </Button>
    </>
  )
}

function SearchButton({className, onClose}: { className?: string, onClose?: () => void }) {
  const {t} = useTranslation()
  const {query} = useKBar();
  const [isOpened, setIsOpened] = useState(false);
  const [_, setLocation] = useLocation()
  const [value, setValue] = useState('')
  const label = t('article.search.title')
  const onSearch = () => {
    const key = `${encodeURIComponent(value)}`
    setTimeout(() => {
      setIsOpened(false)
      if (value.length !== 0)
        onClose?.()
    }, 100)
    if (value.length !== 0)
      setLocation(`/search/${key}`)
  }
  return (<div className={className + " flex flex-row items-center"}>
      <Button onClick={() => query.toggle()} title={label} aria-label={label}
              className="flex rounded-full border px-2 aspect-[1] items-center justify-center t-primary bg-button">
        <i className="ri-search-line dark:text-white"></i>
      </Button>
      <ReactModal
        isOpen={isOpened}
        style={{
          content: {
            top: "20%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            padding: "0",
            border: "none",
            borderRadius: "16px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "none",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          },
        }}
        onRequestClose={() => setIsOpened(false)}
      >
        <div className="bg-w w-full flex flex-row items-center justify-between p-4 space-x-4">
          <Input value={value} setValue={setValue} placeholder={t('article.search.placeholder')}
                 autofocus
                 onSubmit={onSearch}/>
          <Button title={value.length === 0 ? t("close") : label} onClick={onSearch}/>
        </div>
      </ReactModal>
    </div>
  )
}


function UserAvatar({className, profile, onClose}: { className?: string, profile?: Profile, onClose?: () => void }) {
  const {t} = useTranslation()
  const {LoginModal, setIsOpened} = useLoginModal(onClose)
  const label = t('github_login')

  return (<div className={className + " flex flex-row items-center"}>
      {profile?.avatar ? <>
        <div className="w-8 relative">
          <img src={profile.avatar} alt="Avatar" className="w-8 h-8 rounded-full border"/>
          <div className="z-50 absolute left-0 top-0 w-10 h-8 opacity-0 hover:opacity-100 hover:dark:text-white hover:dark:text-black duration-300">
            <IconSmall
              label={t('logout')}
              name="ri-logout-circle-line"
              onClick={() => {
                removeCookie("token")
                window.location.reload()
              }}
              hover={false}
            />
          </div>
        </div>
      </> : <>
        <Button
          variant="ghost"
          onClick={() => setIsOpened(true)}
          title={label}
          aria-label={label}
          className="flex rounded-full border dark:border-neutral-600 px-2 aspect-[1] items-center justify-center"
        >
          <i className="ri-user-received-line dark:text-white"></i>
        </Button>
      </>}
      <LoginModal/>
    </div>
  )
}
