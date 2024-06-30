import { useGlobalStore } from '../store'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Slider from '@mui/material/Slider'
import ImageUpload from './components/ImageUpload'
import Switch from '@mui/material/Switch'
import './Popup.css'
import MaterialUISwitch from './components/MaterialUISwitch'
import { Typography } from '@mui/material'

const commonParamsOfNumInput = {
  type: 'number',
  variant: 'standard',
  margin: 'normal',
  size: 'small',
  inputProps: { step: 0.1 },
} as const

const Popup = () => {
  const show = useGlobalStore((state) => state.show)
  const setShow = useGlobalStore((state) => state.setShow)
  const imgSrc = useGlobalStore((state) => state.imgSrc)
  const setImgSrc = useGlobalStore((state) => state.setImgSrc)
  const size = useGlobalStore((state) => state.size)
  const setSize = useGlobalStore((state) => state.setSize)
  const pos = useGlobalStore((state) => state.pos)
  const setPos = useGlobalStore((state) => state.setPos)
  const scale = useGlobalStore((state) => state.scale)
  const setScale = useGlobalStore((state) => state.setScale)
  const filter = useGlobalStore((state) => state.filter)
  const setFilter = useGlobalStore((state) => state.setFilter)
  const opacity = useGlobalStore((state) => state.opacity)
  const setOpacity = useGlobalStore((state) => state.setOpacity)
  const mixMode = useGlobalStore((state) => state.mixMode)
  const setMixMode = useGlobalStore((state) => state.setMixMode)
  const followScroll = useGlobalStore((state) => state.followScroll)
  const setFollowScroll = useGlobalStore((state) => state.setFollowScroll)

  return (
    <main>
      <Box>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Typography variant="subtitle1" style={{color: 'rgba(0,0,0,0.5)'}}>Pixel Difference</Typography>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: 'right' }}>
            <MaterialUISwitch checked={show} onChange={(_, v) => setShow(v)} />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="X坐标"
              value={pos.x}
              onChange={(e) => setPos({ ...pos, x: +e.target.value || 0 })}
              {...commonParamsOfNumInput}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Y坐标"
              value={pos.y}
              onChange={(e) => setPos({ ...pos, y: +e.target.value || 0 })}
              {...commonParamsOfNumInput}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Z坐标"
              value={pos.z}
              onChange={(e) => setPos({ ...pos, z: +e.target.value || 0 })}
              {...commonParamsOfNumInput}
            />
          </Grid>
          <Grid item xs={3}>
            <FormControl variant="standard" size="small" sx={{ width: 1, mt: 2 }}>
              <InputLabel shrink>跟随滚动</InputLabel>
              <Switch
                checked={followScroll}
                onChange={(_, v) => setFollowScroll(v)}
                size="small"
                sx={{ mt: 2.5, ml: -0.5 }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="宽"
              value={size.width * scale}
              onChange={(e) => setScale((+e.target.value || 0) / size.width)}
              {...commonParamsOfNumInput}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="高"
              value={size.height * scale}
              onChange={(e) => setScale((+e.target.value || 0) / size.height)}
              {...commonParamsOfNumInput}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="缩放比例"
              value={scale}
              onChange={(e) => setScale(Math.max(0, +e.target.value || 0))}
              {...commonParamsOfNumInput}
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl variant="standard" size="small" sx={{ width: 1, mt: 2 }}>
              <InputLabel id="mix-mode-select-label">混合模式</InputLabel>
              <Select
                size="small"
                labelId="mix-mode-select-label"
                value={mixMode}
                onChange={(e) => setMixMode(e.target.value || 'normal')}
              >
                <MenuItem value={'normal'}>正常</MenuItem>
                <MenuItem value={'multiply'}>正片叠底</MenuItem>
                <MenuItem value={'screen'}>滤色</MenuItem>
                <MenuItem value={'overlay'}>叠加</MenuItem>
                <MenuItem value={'darken'}>变暗</MenuItem>
                <MenuItem value={'lighten'}>变亮</MenuItem>
                <MenuItem value={'color-dodge'}>颜色减淡</MenuItem>
                <MenuItem value={'color-burn'}>颜色加深</MenuItem>
                <MenuItem value={'hard-light'}>强光</MenuItem>
                <MenuItem value={'soft-light'}>柔光</MenuItem>
                <MenuItem value={'difference'}>差值</MenuItem>
                <MenuItem value={'exclusion'}>排除</MenuItem>
                <MenuItem value={'hue'}>色相</MenuItem>
                <MenuItem value={'saturation'}>饱和度</MenuItem>
                <MenuItem value={'color'}>颜色</MenuItem>
                <MenuItem value={'luminosity'}>亮度</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={8}>
            <Grid container spacing={1} alignItems="end" justifyContent="start">
              <Grid item xs={4}>
                <TextField
                  label="不透明度"
                  value={opacity}
                  onChange={(e) => setOpacity(Math.max(0, Math.min(+e.target.value || 0, 1)))}
                  {...commonParamsOfNumInput}
                  inputProps={{ step: 0.01 }}
                />
              </Grid>
              <Grid item xs={8}>
                <Slider
                  value={typeof opacity === 'number' ? opacity : 0}
                  onChange={(_, v) => setOpacity(v as number)}
                  min={0}
                  max={1}
                  step={0.01}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="网址过滤器"
              variant="standard"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={filter}
              onChange={(e) => setFilter(e.target.value || '')}
            />
          </Grid>
          <ImageUpload
            value={imgSrc}
            onChange={(imgSrc, width, height) => {
              setImgSrc(imgSrc)
              setSize({ width, height })
            }}
          />
        </Grid>
      </Box>
    </main>
  )
}

export default Popup
