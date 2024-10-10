import React from "react";
import {
  Box,
  Input,
  ListItemButton,
  Modal,
  Typography,
  debounce,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

// Icons
import UpperCaseIcon from "../../assets/upperCase.svg";

// Components
import Header from "../../Components/Header/Header";
import Button from "../../Components/UI/Button/Button";
import CustomModal from "../../Components/CustomModalBox/CustomModalBox";

// Styles
import NoteClassNames from "./Note.module.scss";

// Other
import { useDispatch, useSelector } from "react-redux";
import { INote, INotesList, IRootReducer } from "../../Types/Types";
import { changeNote, updateData } from "../../redux/reducers/rootReducer";
import { ReactSVG } from "react-svg";
import {
  deleteNote,
  findCurrentNote,
  upperCaseNote,
  writeDataNote,
} from "../../utils/utils";
import TextArea from "../../Components/TextArea/TextArea";
import { ENoteStatuses } from "../../enums";

function Note() {
  const [changeActive, setChangeActive] = React.useState({
    type: "",
    status: false,
  });
  const [modalActive, setModalActive] = React.useState<boolean>(false);

  const [loading, setLoading] = React.useState<boolean>(true);
  const [note, setNote] = React.useState<INote | null>({
    id: 0,
    description: "",
    title: "",
  });

  const { id } = useParams();
  const allNotes = useSelector((state: INotesList) => state.rootReducer.notes);
  const user = useSelector((state: IRootReducer) => state.rootReducer.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeNotes = React.useCallback(async () => {
    const filterNotes = allNotes.filter((noteFilter) => {
      return noteFilter.id !== note?.id;
    });

    const resultNotes = [...filterNotes, note];

    if (changeActive.type === "DELETE") {
      dispatch(changeNote(filterNotes));

      return resultNotes;
    } else {
      dispatch(changeNote(resultNotes));

      return resultNotes;
    }
  }, [note?.title, note?.description, note, changeActive]);

  React.useEffect(() => {
    if (!changeActive.status) return;

    if (changeActive.status && changeActive.type !== "DELETE") {
      if (!note) return;

      changeNotes().then(
        debounce(() => {
          writeDataNote(user?.id, note);
        }, 500)
      );
    }

    const userId = user?.id?.toString();

    (async () => {
      if (note?.id.toString() && changeActive.type === "DELETE") {
        const noteId = note.id.toString();

        await deleteNote(userId, noteId).then(dispatch(updateData()));
        await changeNotes();
        navigate("/");
      }
    })();

    if (
      changeActive.status &&
      changeActive.type === ENoteStatuses.UPPERCASE &&
      note
    ) {
      const upperNote = upperCaseNote(note);

      if (!upperNote) return;
      setNote(upperNote);

      setChangeActive({ ...changeActive, type: "" });

      setTimeout(() => {
        setChangeActive({ ...changeActive, status: false });
      }, 1000);
    }
  }, [changeActive]);

  React.useEffect(() => {
    if (allNotes.length && !changeActive.status) {
      const foundNote = findCurrentNote(allNotes, id);

      if (foundNote !== undefined) {
        setNote(foundNote);
        setLoading(false);
      } else {
        navigate("/");
      }
    }
  }, [allNotes]);

  return (
    <Box
      sx={{
        bgcolor: "#2E2E2E",
        color: "white",
        minHeight: "100vh",
        minWidth: "100%",
      }}
    >
      <Header className={NoteClassNames.header}>
        <ListItemButton
          sx={{
            boxSizing: "border-box",
            maxWidth: "41px",
            borderRadius: "8px",
            padding: 0,
          }}
          disableRipple
          onClick={() =>
            setChangeActive({ type: ENoteStatuses.UPPERCASE, status: true })
          }
          onBlur={() => {
            setChangeActive({
              type: ENoteStatuses.UPPERCASE,
              status: false,
            });
          }}
        >
          <ReactSVG
            src={UpperCaseIcon}
            className={NoteClassNames.upperCaseIcon}
          />
        </ListItemButton>
        <Button
          onClick={() => setModalActive(true)}
          className={NoteClassNames.deleteButton}
        >
          Delete
        </Button>
      </Header>
      {!loading ? (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              textAlign: "start",
              paddingLeft: "30px",
              paddingBottom: "70px",
              fontFamily: "Roboto",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                maxWidth: "90%",
              }}
            >
              <Typography
                typography={"div"}
                sx={{
                  fontFamily: "Roboto",
                  fontStyle: "normal",
                  fontWeight: 700,
                  fontSize: "20px",
                  lineHeight: "23px",
                  textTransform: "uppercase",
                  color: "#B3FF78",
                }}
              >
                <span
                  className={
                    !changeActive.status
                      ? NoteClassNames.notePageStatus
                      : NoteClassNames.notePageStatusActive
                  }
                >
                  Редактирование
                </span>
              </Typography>
              <form
                className={NoteClassNames.notePageForm}
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <Input
                  type="text"
                  className={NoteClassNames.title}
                  name="title"
                  inputProps={{ maxLength: 50 }}
                  onChange={(e) => {
                    setChangeActive({
                      type: ENoteStatuses.UPDATE,
                      status: true,
                    });
                    setNote((note: any) => {
                      return {
                        ...note,
                        title: e.target.value,
                        date: new Date().getTime(),
                      };
                    });
                  }}
                  onBlur={() => {
                    setChangeActive({
                      type: ENoteStatuses.UPDATE,
                      status: false,
                    });
                  }}
                  placeholder="Write your Title"
                  disableUnderline
                  value={(note && note.title) || ""}
                />
                <TextArea
                  maxLength={5000}
                  isSpeechText
                  className={NoteClassNames.description}
                  name="description"
                  handleWrite={(text) => {
                    setChangeActive({
                      type: ENoteStatuses.UPDATE,
                      status: true,
                    });
                    setNote((note: any) => {
                      return {
                        ...note,
                        description: text,
                        date: new Date().getTime(),
                      };
                    });
                  }}
                  onBlur={() => {
                    setChangeActive({
                      type: ENoteStatuses.UPDATE,
                      status: false,
                    });
                  }}
                  style={{
                    minHeight: "500px",
                    width: "100%",
                  }}
                  placeholder="Write your description for the title"
                  value={note?.description || ""}
                />
              </form>
            </Box>
          </Box>
        </>
      ) : (
        <h1 style={{ marginLeft: "35px", fontFamily: "Roboto" }}>Loading...</h1>
      )}
      <Modal
        open={modalActive}
        onClose={() => setModalActive(false)}
        className={NoteClassNames.modal}
        slotProps={{
          backdrop: {
            style: {
              background: "rgba(26, 26, 26, 0.5)",
              backdropFilter: "blur(5.5px)",
            },
          },
        }}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className={NoteClassNames.deleteModal}>
          <CustomModal
            text="Confirm note deletion"
            className={NoteClassNames.deleteModalContainer}
          >
            <div className={NoteClassNames.modalActions}>
              <Button
                className={NoteClassNames.modalCanselDeleteButton}
                onClick={() => setModalActive(false)}
              >
                Cansel
              </Button>
              <Button
                className={NoteClassNames.modalConfirmDeleteButton}
                onClick={() =>
                  setChangeActive({
                    type: "DELETE",
                    status: true,
                  })
                }
              >
                confirm
              </Button>
            </div>
          </CustomModal>
        </div>
      </Modal>
    </Box>
  );
}

export default React.memo(Note);
