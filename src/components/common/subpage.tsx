import { classNames } from "@/lib/helpers/ui";
import { Chilanka } from "next/font/google";

const SubPage = ({ className = '', title = '', children }) => {
    return (
        <div className={classNames('page mx-auto max-w-[1000px]', className)}>
            <h1 className="mb-5 text-3xl font-bold">{title}</h1>
            {children}
        </div>
    );
};

export default SubPage;