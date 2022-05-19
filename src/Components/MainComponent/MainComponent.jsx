import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorPopUp } from "../../utlis/ErrorPopUp";
import { logout, requestAPI } from "../../utlis/utils";
import { Header } from "../Header/Header";
import "./MainComponent.css";
import { ProfilesModal } from "./ProfilesModal/ProfilesModal";
import { SearchBus } from "./SearchComponent/SearchBus";
import { WalletModal } from "./WalletModal/WalletModal";

const MainComponent = ({isSearch}) => {
  const [wallet, setWallet] = useState("");
  const [urlHref, setUrlHref] = useState(false);
  const [openErrorPopUp, setOpenErrorPoUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openWalletModal, setOpenWalletModal] = useState(false);
  const [openProfilesModal, setOpenProfilesModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('usertype') === 'Admin') {
      navigate('/admin')
    }
    document.getElementById("loader").style.display = "block";
    requestAPI("GET", "/getwallet", null, null)
      .then((res) => {
        document.getElementById("loader").style.display = "none";
        setWallet(res.data.walletBalance);
      })
      .catch((err) => {
        document.getElementById("loader").style.display = "none";
        setErrorMessage(err.response.data.message);
        setOpenErrorPoUp(true);
        if (err.response.data.message === "Authentication Failed.") {
          logout();
        }
      });

    setOpenWalletModal(false);
    setOpenProfilesModal(false);
    if (window.location.pathname === "/wallet") {
      setOpenWalletModal(true);
    } else if (window.location.pathname === "/profile") {
      setOpenProfilesModal(true);
    }
  }, [urlHref]);

  return (
    <>
        <Header wallet={wallet} setUrlHref={setUrlHref} urlHref={urlHref} />
        {isSearch?<SearchBus />:null}
        <WalletModal
          wallet={wallet}
          setWallet={setWallet}
          setUrlHref={setUrlHref}
          urlHref={urlHref}
          IsModalOpen={openWalletModal}
        />
        <ProfilesModal
          setUrlHref={setUrlHref}
          urlHref={urlHref}
          IsModalOpen={openProfilesModal}
        />
      <ErrorPopUp
        message={errorMessage}
        open={openErrorPopUp}
        setOpen={setOpenErrorPoUp}
      />
    </>
  );
};

export default React.memo(MainComponent);
