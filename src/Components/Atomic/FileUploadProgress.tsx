import { FileUploadProgressContext } from 'Utils/FileUploadProgressContext'
import { useContext } from 'react'
import styled from 'styled-components'
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress'
import { Box, Typography } from '@mui/material'
import { Color, FontSize } from 'styles/Enums'

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color={Color.Main2}
          fontSize={FontSize.Px16}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  )
}

export const FileUploadProgress: React.FC = () => {
  const context = useContext(FileUploadProgressContext)

  return (
    <>
      {context.progress != undefined && (
        <Wrapper data-is-show={String(true)}>
          <CenterBlock>
            <CircularProgressWithLabel value={context.progress} size={75} />
          </CenterBlock>
        </Wrapper>
      )}
    </>
  )
}

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  background-color: rgba(255, 255, 255, 0.4);
  pointer-events: auto;
  transition: opacity 0.2s ease-in-out;

  &[data-is-show='false'] {
    opacity: 0;
    pointer-events: none;
  }
`

const CenterBlock = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
