import { useNavigate } from "react-router-dom";
import SideNav from "../../sidenav/SideNav";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

function AcompanhamentoHiperdiaImport() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    var token = window.localStorage.getItem("x-access-token");

    function verificaPermissao() {
        axios({
            method: "post",
            url: "https://central-pm-api-v2.onrender.com/users/checksession",
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
                        "AcompanhamentoHiperdiaImport"
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
            <SideNav activeLink={"ameHiperdia"} />
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
                        src="https://docs.google.com/spreadsheets/d/1XV3fbZj4LfCpr0lEASMKtkxB_yhK8_PHz8nyir_-ogk/edit?rm=demo"
                    ></iframe>
                </div>
            )}
        </div>
    );
}

export default AcompanhamentoHiperdiaImport;
