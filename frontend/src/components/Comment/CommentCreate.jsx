import { IconSend2 } from "@tabler/icons-react";

function CommentCreate() {
    return (
        <div>
            <div className="flex items-center space-x-2 rounded-full">
                <div>
                    <img
                        className="w-10 rounded-full"
                        src="https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-1/428297162_1760349381143905_2080811858875395246_n.jpg?stp=cp6_dst-jpg_s200x200_tt6&_nc_cat=100&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=z1fkJuv8C58Q7kNvgHBpSro&_nc_zt=24&_nc_ht=scontent.fhan15-2.fna&_nc_gid=AEqaVRD01ihiFdEqLyH_zHe&oh=00_AYBTEdAskxOmG1Oo8jkm_vYn79OQ6hC7XR-rFFq1-DbqHg&oe=67473A49"
                        alt="Anh luan dep trai"
                    />
                </div>
                <div className="border-none p-2 bg-alice-blue flex-1 rounded-md">
                    <div>
                        <textarea
                            className="w-full bg-alice-blue min-h-8 rounded-md p-x-8 outline-none resize-none"
                            name=""
                            id=""
                            placeholder="コメントを追加"
                        ></textarea>
                    </div>
                    <div className="flex w-full">
                        <div className="ml-auto ">
                            <IconSend2 />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommentCreate;
