import { useFormik } from "formik";
import * as Yup from "yup";
import cx from "classnames";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { AuthService } from "../../Services/Auth";
import { setUser } from "../../Reducers/Auth";

const Schema = Yup.object().shape({
    email: Yup.string().required("Required").email(),
    password: Yup.string().required("Required"),
});

const BasicAuth = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validateOnChange: false,
        validationSchema: Schema,
        onSubmit: async (values) => {
            const { email, password } = values;

            AuthService.login(email, password)
            .then((result: any) => {
                if (result) {
                    const user = { ...result, loggedIn: true };
                    dispatch(setUser({ user }));
                    history.push('/secure');
                }
            })
            .catch((error) => {
                console.log("error", error)
            });
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input
                    disabled={formik.isSubmitting}
                    value={formik.values.email}
                    onChange={formik.handleChange("email")}
                    type="email"
                    placeholder="Email"
                    className={cx("input input-bordered w-full", {
                        "border-red-400": formik.errors.email,
                    })}
                />
                {formik.errors.email && (
                    <div className="text-red-500">{formik.errors.email}</div>
                )}
            </div>
            <div className="mt-5">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input
                    disabled={formik.isSubmitting}
                    value={formik.values.password}
                    onChange={formik.handleChange("password")}
                    type="password"
                    placeholder="Password"
                    className={cx("input input-bordered w-full", {
                        "border-red-400": formik.errors.password,
                    })}
                />
                {formik.errors.password && (
                    <div className="text-red-500">{formik.errors.password}</div>
                )}
            </div>
            <div className="mt-5 flex justify-end">
                <button
                    className={cx("btn btn-primary", {
                        loading: formik.isSubmitting,
                    })}
                    type="submit"
                >
                    Login
                </button>
            </div>
        </form>
    );
};

export default BasicAuth;
