import { useNavigate } from "react-router-dom";
import SideNav from "../../sidenav/SideNav";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

function LevantamentoGruposPrioritariosFarmacia() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    var token = window.localStorage.getItem("x-access-token");

    function verificaPermissao() {
        axios({
            method: "post",
            url: "https://central-pm-api-dev.onrender.com/users/checksession",
            data: {
                token: token,
            },
            headers: {
                authorization: token,
            },
        })
            .then((res) => {
                if (
                    !res.data.permissoes.includes(
                        "LevantamentoGruposPrioritariosFarmacia"
                    )
                ) {
                    navigate("/");
                    return Swal.fire("Acesso negado", "", "error");
                }
                setLoading(false);
            })
            .catch((err) => {
                navigate("/");
                window.location.reload();
                return Swal.fire(
                    "Erro ao verificar as permissões",
                    "",
                    "error"
                );
            });
    }

    useEffect(() => {
        verificaPermissao();
    }, []);
    return (
        <div>
            <SideNav activeLink={"aps"} />
            {loading ? (
                <div>
                    <div className="text-center mt-5">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="col-xs-12 col-sm-12 col-md-9 iframe">
                    <iframe
                        style={{ width: "140%", height: "100vh" }}
                        src="https://docs.google.com/forms/u/0/d/e/1FAIpQLSey6JNJ0MiYZGko8vPEAPC_iAF22hTeHoKpZxX-qs62j47QNw/formResponse?embedded=true"
                    ></iframe>
                </div>
            )}
        </div>
    );
}

export default LevantamentoGruposPrioritariosFarmacia;
