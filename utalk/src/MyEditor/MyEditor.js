import React from 'react'
import AvatarEditor from 'react-avatar-editor'
import axios from 'axios'
import './MyEditor.css'

class MyEditor extends React.Component {

  state = {
    img: '',
    scale: 1,
    rotate: 0,
    preview: {},
    percent: 0,
  }

  imgChange = (e) => {
    this.setState({
      img: e.target.files[0],
    })
  }

  handleRangeChange = (e) => {
    this.setState({
      scale: parseFloat(e.target.value),
      percent: Math.floor(e.target.value * 100) - 100,
    })
  }

  rotateLeft = (e) => {
    e.preventDefault()
    this.setState({
      rotate: this.state.rotate - 90
    })
  }

  rotateRight = (e) => {
    e.preventDefault()
    this.setState({
      rotate: this.state.rotate + 90
    })
  }

  saveImg = async () => {
    // const file = this.editor.getImageScaledToCanvas().toDataURL();
    const file = this.state.img;
    console.log(file);

    if (file) {

      const data = new FormData();
      data.append("file", file);
      data.append("userId", this.props.userId);
      try {
        const res = await axios.post('http://localhost:8082/api/uploadAvatar', data,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
        )
        console.log(res.data);
        // if (res.data.errCode == 1) {
        //   console.log(res.data.message);
        // }
      }
      catch (e) {

      }
    } else {
      console.log("Hãy chọn ảnh đại diện mới");
    }
  }

  setEditorRef = (editor) => (this.editor = editor)
  render() {

    return (
      <div className='MyEditor'>
        {
          console.log(this.props.userId)
        }
        <div className='container'>
          <div className='textBx'>
            <h2> Cập nhật ảnh đại diện của bạn </h2>
          </div>
          <AvatarEditor
            ref={this.setEditorRef}
            image={this.state.img}
            width={300}
            height={300}
            border={100}
            borderRadius={200}
            color={[255, 255, 255, 0.6]} // RGBA
            scale={this.state.scale}
            rotate={this.state.rotate}
          />
          <div className='control'>
            <div className='imgBx'>
              <label htmlFor='upload'>
                <i className="fa-solid fa-plus"></i>
                <input type='file' id='upload' onChange={this.imgChange} className="choseFile">
                </input>
              </label>
              <h3>Tải ảnh lên</h3>
              <button onClick={this.rotateLeft}> Xoay trái </button>
              <button onClick={this.rotateRight}> Xoay phải </button>
            </div>
            <div className='rangeBx'>
              <input type='range' onChange={this.handleRangeChange} min='1' max='2'
                step='0.01' defaultValue={1}
                style={{
                  background: `linear-gradient(to right,rgb(241, 50, 50) 0%, rgb(241, 50, 50) 
                ${this.state.percent}%,  #fff ${this.state.percent}%, #fff 100%)`,
                }}></input>

            </div>
            <button onClick={this.saveImg} className='saveImg'><h3> Lưu ảnh </h3></button>
            {/* {
              this.state.preview.img && (
                <div>
                  <img src={this.state.preview.img}
                    style={{
                      borderRadius: this.state.preview.borderRadius,
                    }} />
                </div>
              )
            } */}
          </div>
        </div>
      </div>
    )
  }
}

export default MyEditor