#!/bin/sh

# local configuration options

# Note: modify at your own risk!  If you do/use anything in this
# script that is not part of a stable API (relying on files to be in
# specific places, specific tools, specific output, etc) there is a
# possibility you will end up with a broken system after patching or
# upgrading.  Changes are not supported unless under direction of
# VMware support.

# Note: This script will not be run when UEFI secure boot is enabled.

# /sbin/auto-backup.sh

#
# start "vCenter VM"
#
startup_vcenter() {
  #
  # wait for Shared Disk starting up
  #
  cnt=0
  while :
  do
    cnt=`expr $cnt + 1`
    if [ $cnt -ge 30 ]; then
      break
    fi
    ngCnt=`vim-cmd vmsvc/getallvms 2>&1 | grep "Skipping invalid VM\|503" | wc -l`
    if [ $ngCnt = 0 ]; then
      break
    fi
    echo "`date` wait for Shared Disk starting up..."
    sleep 10s
  done

  #
  # start vMA
  #
  vma=`vim-cmd vmsvc/getallvms | grep " vMA" | awk '{print $1}'`
  vim-cmd vmsvc/power.on $vma

  #
  # start vCenter
  #
  vc=`vim-cmd vmsvc/getallvms | grep " vm-vcenter " | awk '{print $1}'`
  if [ x"$vc" != "x" ]; then
    while :
    do
      vim-cmd vmsvc/power.on $vc
      ps=`vim-cmd vmsvc/power.getstate $vc | grep Powered | awk '{print $2}'`
      if [ "$ps" = "on" ]; then
        echo "`date` vCenter has started!"
        break
      fi
      echo "`date `wait for vCenter starting up..."
      sleep 10s
    done
  fi
}

startup_vcenter > /var/log/startup_vcenter.log 2>&1

exit 0
