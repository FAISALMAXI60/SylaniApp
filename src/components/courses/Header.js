import React from "react";
import { Link } from "react-router-dom";
import { Drawer, Button, Icon } from "antd";

// class Header extends React.Component {
//   render() {
//     return (
//       <div className="container-fluid border mt-4 mb-3">
//         <div className="navbar-fixed">
//           <nav className="navbar navbar-expand-lg navbar-light bg-light">
//             <button
//               className="navbar-toggler"
//               type="button"
//               data-toggle="collapse"
//               data-target="#navbarTogglerDemo03"
//               aria-controls="navbarTogglerDemo03"
//               aria-expanded="false"
//               aria-label="Toggle navigation"
//             >
//               <span className="navbar-toggler-icon" />
//             </button>
//             <a className="navbar-brand" href="/">
//               <img
//                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToZcEtGCeNt4JvcwAizsQEMa6jIS19scwBU04UcdcrzxEt2bsk"
//                 width="70%"
//                 alt='Saylani'
//               />
//             </a>

//             <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
// <ul className="m-auto navbar-nav mr-auto mt-2 mt-lg-0">
//   <li className="nav-item active">
//     <Link to={`${this.props.home}`}>
//       <span className="nav-link btn-light">
//         Home <span className="sr-only">(current)</span>
//       </span>
//     </Link>
//   </li>
//   <li className="nav-item">
//     <Link to={`${this.props.add}`}>
//       <span className="nav-link btn-light">
//         Add {this.props.addEntity}
//       </span>
//     </Link>
//   </li>
//   <li className="nav-item">
//     <Link to={`${this.props.active}`}>
//       <span className="nav-link btn-light">
//         Active {this.props.entity}
//       </span>
//     </Link>
//   </li>
//   <li className="nav-item">
//     <Link to={`${this.props.deactive}`}>
//       <span className="nav-link btn-light">
//         {this.props.entity == "Students"
//           ? "Eliminated"
//           : "Deactive"}{" "}
//         {this.props.entity}
//       </span>
//     </Link>
//   </li>
//   <li className="nav-item">
//     <Link to={`${this.props.completed}`}>
//       <span className="nav-link btn-light">
//         Completed {this.props.entity}
//       </span>
//     </Link>
//   </li>
//   <li className="nav-item">
//     <Link to={`${this.props.back}`}>
//       <span className="nav-link btn-light">Back</span>
//     </Link>
//   </li>
// </ul>
//             </div>
//           </nav>
//         </div>
//       </div>
//     );
//   }
// }
class Header extends React.Component {
  state = {
    visible: false
  };

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <div>
        <Button shape="circle" onClick={this.showDrawer} id="HeaderBTN">
          <Icon type="bars" />
        </Button>{" "}
        <Drawer
          title="Saylani"
          placement="left"
          closable={true}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <ul className="m-auto navbar-nav mr-auto mt-2 mt-lg-0">
            <Button block>
              <Link to={`${this.props.home}`}>Home</Link>
            </Button>
            <Button block>
              <Link to={`${this.props.add}`}>Add {this.props.addEntity}</Link>
            </Button>
            <Button block>
              <Link to={`${this.props.active}`}>
                Active {this.props.entity}
              </Link>
            </Button>
            <Button block>
              <Link to={`${this.props.deactive}`}>
                {this.props.entity == "Students" ? "Eliminated" : "Deactive"}{" "}
                {this.props.entity}
              </Link>
            </Button>
            <Button block>
              <Link to={`${this.props.completed}`}>
                Completed {this.props.entity}
              </Link>
            </Button>
            {this.props.entity == "Students" &&
            <Button block>
              <Link to={`${this.props.back}/cards`}>Print Cards</Link>
            </Button>
            }
            <Button block>
              <Link to={`${this.props.back}`}>Back</Link>
            </Button>
          </ul>
        </Drawer>{" "}
      </div>
    );
  }
}

export default Header;
