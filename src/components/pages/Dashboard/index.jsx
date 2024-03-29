import api from "../../services/api";

import { Redirect, useHistory } from "react-router-dom";

import { AnimatedContainer, Container, Logo, StyledDiv } from "./styles";
import { useEffect, useState } from "react";
import { Trash } from "phosphor-react";
import { toast } from "react-toastify";

import { DashModal } from "../../Modal";

export const Dashboard = ({ authenticated, setAuthenticated }) => {
  const user = JSON.parse(localStorage.getItem("@Kenziehub:user"));
  const token = JSON.parse(localStorage.getItem("@Kenziehub:token"));

  const history = useHistory();

  const handleNavigation = (patch) => {
    return history.push(patch);
  };

  const [modal, setModal] = useState(false);

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.clear();
    // handleNavigation("/");
  };

  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    api
      .get(`/users/${user.id}`)
      .then((res) => {
        setUserInfo(res.data.techs);
      })
      .catch((err) => console.log(err));
  }, [userInfo]);

  const deleteTech = (id) => {
    api
      .delete(`/users/techs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((_) => toast.success("Tecnologia removida"))
      .catch((_) => toast.error("Ops! Algo deu errado"));
  };

  if (!authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Container>
        <Logo>
          <div>
            <h1 onClick={() => handleNavigation("/")}>Kenzie Hub</h1>
            <button onClick={handleLogout}>Sair</button>
          </div>
          <div>
            <h2>Olá, {user.name}</h2>
            <span>{user.course_module}</span>
          </div>
          <div>
            <h3>Tecnologias</h3>
            <button onClick={() => setModal(true)}>+</button>
          </div>
        </Logo>
        <StyledDiv>
          <AnimatedContainer>
            {userInfo.map((tech) => (
              <div key={tech.id}>
                <h4>{tech.title}</h4>
                <div>
                  <p>{tech.status}</p>
                  <Trash
                    size={20}
                    weight="regular"
                    onClick={() => deleteTech(tech.id)}
                  />
                </div>
              </div>
            ))}
          </AnimatedContainer>
        </StyledDiv>
      </Container>
      {modal && <DashModal setModal={setModal} />}
    </>
  );
};
