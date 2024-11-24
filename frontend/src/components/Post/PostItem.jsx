import { IconMessageCircle, IconShare3, IconThumbUp } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
const PostItem = () => {
  return (
    <>
      <div className='bg-alice-blue p-5 rounded-lg mb-5'>
        <div className='flex space-x-5 mb-4'>
          <div className='h-12 w-12 rounded-full bg-white'>
            <img
              className="w-12 rounded-full"
              src="https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-1/428297162_1760349381143905_2080811858875395246_n.jpg?stp=cp6_dst-jpg_s200x200_tt6&_nc_cat=100&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=z1fkJuv8C58Q7kNvgHBpSro&_nc_zt=24&_nc_ht=scontent.fhan15-2.fna&_nc_gid=AEqaVRD01ihiFdEqLyH_zHe&oh=00_AYBTEdAskxOmG1Oo8jkm_vYn79OQ6hC7XR-rFFq1-DbqHg&oe=67473A49"
              alt="Anh luan dep trai"
            />
          </div>
          <div className='flex flex-col justify-center'>
            <div>
              <span>ディン・ヴァン・ルアン</span>
            </div>
            <div>
              <span>2024-12-20</span>
            </div>
          </div>
        </div>
        <Link to='/post/123'>
          <div className='mb-5'>
            <img
              src="https://pds.exblog.jp/pds/1/flash/top/image/e715a6283c881b09c58c1f1157ea0dcb.jpg"
              alt="Post avatar"
              className='w-full object-cover'
            />
          </div>
        </Link>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <IconThumbUp stroke={2} />
            <span className='ml-2'>ライク</span>
          </div>
          <div className='flex items-center'>
            <IconMessageCircle stroke={2} />
            <span className='ml-2'>コメント</span>
          </div>
          <div className='flex items-center'>
            <IconShare3 stroke={2} />
            <span className='ml-2'>共有</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default PostItem;
