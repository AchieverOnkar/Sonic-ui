
import React from 'react'
import view1 from '../assets/view1.png';
import view2 from '../assets/viewSong.png';
import view3 from '../assets/songs.png';
import add1 from '../assets/addArtist.png';
import add2 from '../assets/addPlaylist.png';
import add3 from '../assets/addSong.png';

function AdminHome() {
    return (
        <div className='admin-dashboard'>

            <h1>Welcome to admin Dashboard !!!</h1>
            <div class="action-ctn">
                <div className="card">
                    <div className="icon">
                        <i class="ri-add-circle-line"></i>
                    </div>
                    {/* <img src={add1} alt="" className="icon" /> */}
                    <h4>Create New Artist</h4>
                    <button>
                        <a href="/createArtist">Create Artist</a>
                    </button>
                </div>
                <div className="card">
                    <div className="icon">
                        <i class="ri-add-circle-line"></i>
                    </div>
                    {/* <img src={view1} alt="" className="icon" /> */}

                    <h4>View all Artist</h4>
                    <button>
                        <a href="/viewAllArtist"><i class="ri-list-view"></i>View Artists</a>
                    </button>
                </div>

                <div className="card">
                    <div className="icon">
                        <i class="ri-add-circle-line"></i>
                    </div>
                    {/* <img src={add3} alt="" className="icon" /> */}

                    <h4>Add New Songs</h4>
                    <button>
                        <a href="/newSong"><i class="ri-file-add-line"></i>Add Songs</a>
                    </button>
                </div>

                <div className="card">
                    <div className="icon">
                        <i class="ri-table-view"></i>
                    </div>
                    {/* <img src={view3} alt="" className="icon" /> */}

                    <h4>View all Songs</h4>
                    <button>
                        <a href="/viewAllSongs">View Songs</a>
                    </button>
                </div>
                <div className="card">
                    <div className="icon">
                        <i class="ri-add-circle-line"></i>
                    </div>
                    {/* <img src={add2} alt="" className="icon" /> */}

                    <h4>Create New Playlist</h4>
                    <button>
                        <a href="/createPlaylist"><i class="ri-play-list-add-line"></i>Create Playlist</a>
                    </button>
                </div>

                <div className="card">
                    <div className="icon">
                        <i class="ri-add-circle-line"></i>
                    </div>
                    {/* <img src={view2} alt="" className="icon" /> */}
                    <h4>view All Playlist</h4>
                    <button>
                        <a href="/viewPlaylist"><i class="ri-list-view"></i>View Playlist</a>
                    </button>
                </div>

            </div>

        </div>
    )
}

export default AdminHome