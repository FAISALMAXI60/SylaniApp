import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import LoadingScreen from "../loadingScreen";
import Typography from "@material-ui/core/Typography";

class ResponsiveDialog extends React.Component {
  state = {
    loading: true,
    data: [],
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  componentDidMount() {
    this.setState({
      loading: false,
      data: this.props.data
    });
  }
  render() {
    const { fullScreen } = this.props;
    if (this.state.loading) {
      return <LoadingScreen />;
    }

    return (
      <div>
        <Button onClick={this.handleClickOpen} variant="contained">
          <Typography variant="h5">Details</Typography>
        </Button>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            <Typography
              variant="h3"
              className="text-center m-2"
              id="modal-title"
            >
              {this.props.entity}
            </Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {this.state.data.length === 0 ? (
                <div className="card m-2">
                  <div className="card-body outerEffect">
                    <h4 className="card-title text-center">
                      There Is No {this.props.entity}.
                    </h4>
                    <p className="card-text text-center">
                      Please Add A {this.props.entity}.
                    </p>
                  </div>
                </div>
              ) : (
                this.state.data.map((Obj, index) => {
                  return (
                    <div className="card bg-light m-2" key={index}>
                      <div className="card-body text-center outerEffect">
                        <h3 className="card-text text-dark">{Obj.name}</h3>
                      </div>
                    </div>
                  );
                })
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              <Typography variant="h5">Close</Typography>
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ResponsiveDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired
};

export default withMobileDialog()(ResponsiveDialog);

// import React from "react";
// import LoadingScreen from "../loadingScreen";
// import PropTypes from "prop-types";
// import { withStyles } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";
// import Modal from "@material-ui/core/Modal";
// import Button from "@material-ui/core/Button";

// function getModalStyle() {
//   const top = 50 ;
//   const left = 50;

//   return {
//     top: `${top}%`,
//     left: `${left}%`,
//     transform: `translate(-${top}%, -${left}%)`
//   };
// }

// const styles = theme => ({
//   paper: {
//     position: "absolute",
//     width: theme.spacing.unit * 50,
//     backgroundColor: theme.palette.background.paper,
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing.unit * 4
//   }
// });

// class ShowMore extends React.Component {
//   state = {
//     loading: true,
//     data: [],
//     open: false
//   };
//   handleOpen = () => {
//     this.setState({ open: true });
//   };

//   handleClose = () => {
//     this.setState({ open: false });
//   };
//   componentDidMount() {
//     this.setState({
//       loading: false,
//       data: this.props.data
//     });
//   }
//   render() {
//     const { classes } = this.props;
//     if (this.state.loading) {
//       return <LoadingScreen />;
//     }
//     return (
//       <div>
//         <Button
//           onClick={this.handleOpen}
//           className={classes.button}
//           variant="contained"
//         >
//           <Typography variant="h5">Details</Typography>
//         </Button>
//         <Modal
//           aria-labelledby="simple-modal-title"
//           aria-describedby="simple-modal-description"
//           open={this.state.open}
//           onClose={this.handleClose}
//         >
//           <div style={getModalStyle()} className={classes.paper}>
// <Typography
//   variant="h3"
//   className="text-center m-2"
//   id="modal-title"
// >
//   {this.props.entity}
// </Typography>
//             <Typography variant="subtitle1" id="simple-modal-description">
//               {this.state.data.length == 0 ? (
//                 <div className="card">
//                   <div className="card-body outerEffect">
//                     <h4 className="card-title text-center">
//                       There Is No Course.
//                     </h4>
//                     <p className="card-text text-center">
//                       Please Add A Course.
//                     </p>
//                   </div>
//                 </div>
//               ) : (
//                 this.state.data.map((Obj, index) => {
//                   return (
//                     <div className="card bg-light" key={index}>
//                       <div className="card-body text-center outerEffect">
//                         <h3 className="card-text text-dark">{Obj.name}</h3>
//                       </div>
//                     </div>
//                   );
//                 })
//               )}
//             </Typography>
//           </div>
//         </Modal>
//       </div>
//     );
//   }
// }
// ShowMore.propTypes = {
//   classes: PropTypes.object.isRequired
// };
// const MyModal = withStyles(styles)(ShowMore);
